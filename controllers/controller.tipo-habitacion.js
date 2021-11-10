const { response, request } = require("express");
const { notificacionSis, notificacionOK } = require("../helpers");
const { Tipo_habitacion } = require("../models");

const postTipoHabitacion = async (req, res = response) => {
    try {
      const { categoria, camas, terraza, precio,img = "" } = req.body;
      const tipoHabitacion = new Tipo_habitacion({
        categoria: firstUpper(categoria),
        camas,
        terraza,
        img,
        precio
      });
      //guardar en DB
      const result =await tipoHabitacion.save();
      res.json(notificacionOK({res:result.id}));

    } catch (error) {
      res.status(500).json(notificacionSis(error));
    }
  };

  const getTipoHabitacion = async (req, res = response) => {
    try {
      const { limite = 5, desde = 0 } = req.query;
  
      const [total, habitacion] = await Promise.all([
        Tipo_habitacion.countDocuments(),
        Tipo_habitacion.find().skip(Number(desde)).limit(Number(limite)),
      ]);

      res.json( notificacionOK({ total, habitacion,}));
    } catch (error) {
      res.status(500).json(notificacionSis(error));
    }
  };

  const getTipoHabitacionEspecifico = async (req, res = response) => {
    try {
      const { id } = req.params;
      const habitacion  = await Tipo_habitacion.findById(id);

       res.json(notificacionOK(habitacion));

    } catch (error) {
      res.status(500).json(notificacionSis(error));
    }
  };

  const putTipoHabitacion = async (req, res = response) => {
    try {
      const { id } = req.params;
      const { _id, ...resto } = req.body;
      const tipoDB = await Tipo_habitacion.findByIdAndUpdate(id, resto);
  
      res.status(200).json(
          notificacionOK("Datos actulizados correctamente -tipoHabitacion"));
    } catch (error) {
      res.status(500).json(notificacionSis(error));
    }
  };
  
  const deleteTipoHabitacion = async (req, res = response) => {
    try {
      const { id } = req.params;
      const {estado} =  await Tipo_habitacion.findById(id);
      const tipo = await Tipo_habitacion.findByIdAndUpdate(id, { estado: !estado });
  
      !estado===true
      ?res.json(notificacionOK("Tipo de habitacion habilitado correctamente"))
      :res.json(notificacionOK("Tipo de habitacion deshabilitado correctamente"))
    } catch (error) {
      res.status(500).json(notificacionSis(error));
    }
  };

  module.exports = {
    postTipoHabitacion,
    getTipoHabitacion,
    putTipoHabitacion,
    deleteTipoHabitacion,
    getTipoHabitacionEspecifico
  };
  