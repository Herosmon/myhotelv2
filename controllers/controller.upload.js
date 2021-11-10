const path= require('path');
const fs = require('fs')
const { response, json } = require("express");

const cluoudnary = require('cloudinary').v2;
const { Usuario, Tipo_habitacion, Servicio } = require('../models');
const { notificationError, notificacionOK } = require('../helpers');
cluoudnary.config(  process.env.CLOUDINARY_URL);


const actualizarImagenCloudinary = async (req, res = response) => {
    const { id, coleccion } = req.params;
    const {uri}= req.body;
    let modelo;
  
    switch (coleccion) {
      case "usuario":
        modelo = await Usuario.findById(id);
        if (!modelo) {
        return res.status(400)
        .json(notificationError("Error",`No existe un  usuario con el id ${id}` ));

        }
        break;
  
      case "tipo_habitacion":
        modelo = await Tipo_habitacion.findById(id);
        if (!modelo) {
            return res.status(400)
            .json(notificationError("Error",`No existe un tipo de habitación con el id ${id}` ));
          
        }
        break;
  
        case "servicio":
          modelo = await Servicio.findById(id);
          if (!modelo) {
            return res.status(400)
            .json(notificationError("Error",`No existe un servicio con el id ${id}` ));
          }
          break;
  
      default:
        return res.status(500).json({ msg: "Olvide validar esto" });
    }
  
    //Limpiar imagenes previas
  
      try {
        if(modelo.img){
            const nombreArr=modelo.img.split('/');
            const nombre= nombreArr[nombreArr.length-1];
            const [public_id]=nombre.split('.')
            cluoudnary.uploader.destroy(public_id);
  
       }
  
       if(!uri){
        const {tempFilePath}= req.files.archivo
        const  {secure_url}= await cluoudnary.uploader.upload(tempFilePath)
        modelo.img = secure_url;
       }else{
        
        const  {secure_url}= await cluoudnary.uploader.upload(uri)
        modelo.img = secure_url;
       }
      
  
       await modelo.save();
       res.json(notificacionOK(modelo));
         
  
      } catch (error) {
        
        res.status(500).json(notificationError(error))
      }
  
  
  };

  
module.exports = {
    actualizarImagenCloudinary,
  };
  