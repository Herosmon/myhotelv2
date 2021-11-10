const { response, request } = require("express");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const path = require("path");
const { notificationError, notificacionOK, generarJWT, plantillaCorreoRecuperacion, notificacionSis, generarResetJWT, transporter } = require("../helpers");
const { Usuario } = require("../models");

const login_cliente = async (req, res = response) => {

    const { correo, clave } = req.body;

    try {
      //verificar si correo existe
      const usuario = await Usuario.findOne({ correo });
      if (!usuario) {
        return res.status(400)
            .json( notificationError(
                "error credenciales", 
                "Usuario o Contraseña no son correctos - correo"));
      }
      //verificar estado del cliente
      if (!usuario.estado) {
        return res.status(400).json(
            notificationError(
                "error credenciales", 
                "Usuario o Contraseña no son correctos - estado: false")
            );
      }
      //verificar clave
      const validarClave = bcryptjs.compareSync(clave, usuario.clave);
      if (!validarClave) {
        return res.status(400).json(
            notificationError(
                "error credenciales", 
                "Usuario o Contraseña no son correctos - clave")
            );
      }

      const token = await generarJWT(usuario.id);
      res.status(200).json(notificacionOK({usuario,token}));

    } catch (error) {
      res.status(500).json(notificacionSis(error));
    }
  };

  const menu_recuperar_contraseña = async (req, res = response) => {
    res.sendFile(path.resolve(__dirname, "../public/forgot_password.html"));
  };


  // TODO hacer correción de codigo linea 52 en adelante, OPTIMIZAR funcion recuperar_contraseñakl 
 
  const recuperar_contraseña = async (req, res = response) => {
    const { c } = req.params;
    const token = c;
    const { newPassword } = req.body;

    if (!(token && newPassword)) {
      return res.status(400).json( notificationError("Error","Todos los campos son requeridos" ));
    }
  
    try {
      const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);
  
      if (!uid) {
        return res
          .status(402)
          .json( notificationError('Error',"Error - Token no valido"));
      }
      let reset = token;
      if (!(await Usuario.findById(uid, { reset }))) {
        return res
          .status(402)
          .json(notificationError('Error',"Error - crendenciales")
        );
      }
  
      const salt = bcryptjs.genSaltSync(10);
      clave = bcryptjs.hashSync(newPassword, salt);
      reset = "";
      await Usuario.findByIdAndUpdate(uid, { clave, reset });
  
      res.status(201).json( notificacionOK("Clave cambiada con exito"));

    } catch (error) {
      res.status(500).json(notificacionSis(error));
    }
  };

  const olvido_contraseña = async (req = require, res = response) => {
    const { correo } = req.body;

    try {

      const usuario = await Usuario.findOne({ correo });

      if (!usuario) {
        return res
          .status(404)
          .json(notificationError("Error","Datos no validos"));
      }
  
      const token = await generarResetJWT(usuario.id);
      const reset = `https://udmyhotelproject.herokuapp.com/myhotel/auth/recuperar/${token}`;
      const actualizado = await Usuario.findByIdAndUpdate(usuario.id, { reset });
  
      if (!actualizado) {
        return res
            .status(500)
            .json(notificationError('Error','Error al intentar recuperar contraseña')
        );
      }
  
      //enviar Email
      try {
        await transporter.sendMail(
          
           {
            from: '"Recuperar Contraseña" <jdmorenov@correo.udistrital.edu.co>',
            to: usuario.correo, // list of receivers
            subject: "Recuperar Contraseña", // Subject line
      
            html: `
                        <b>Please click on the following link</b>
                        <a href='${reset}'>Link Verificación</a>
                    `,
          }
        );
      } catch (error) {
        return res
          .status(400)
          .json(
              notificationError('Error',error )
            );
      }
  
      return res.status(200).json(
          notificacionOK('Revisa tu correo'));
    } catch (error) {
      res.status(500).json(notificacionSis(error));
    }
  };
  
  module.exports = {
    login_cliente,
    menu_recuperar_contraseña,
    olvido_contraseña,
    recuperar_contraseña,
  };
  