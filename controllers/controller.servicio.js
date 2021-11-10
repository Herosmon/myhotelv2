const { response, request } = require("express");
const { firstUpper, notificacionOK } = require("../helpers");
const { Servicio } = require("../models");


const postServicio = async (req, res = response) => {
    try {
        const { nombre, descripcion, precio } = req.body;
        const service = new Servicio({
            nombre: firstUpper(nombre),
            descripcion,
            precio
        });
        //guardar en DB
        const result = await service.save();
        res.json(notificacionOK(result.id));
    } catch (error) {
        res.status(500).json(notificacionSis(error));
    }
};

const getServicio = async (req, res = response) => {
    try {
        const { limite = 5, desde = 0 } = req.query;
        const query = { estado: true };
        const [total, servicio] = await Promise.all([
            Servicio.countDocuments(query),
            Servicio.find(query).skip(Number(desde)).limit(Number(limite)),
        ]);
        res.status(200).json(notificacionOK({ total, servicio }));
    } catch (error) {
        res.status(500).json(notificacionSis(error));
    }
};

const getServicioEspecifico = async (req, res = response) => {
    try {
        const { id } = req.params;
        const servicio = await Servicio.findById(id);
        res.json(notificacionOK(servicio));
    } catch (error) {
        res.status(500).json(notificacionSis(error));
    }
};

const putServicio = async (req, res = response) => {
    try {
      const { id } = req.params;
      const { _id, ...resto } = req.body;
      const serviceDB = await Servicio.findByIdAndUpdate(id, resto);
      res.json(
          notificacionOK('Datos actulizados correctamente -tipoHabitacion'));
    } catch (error) {
      res.status(500).json(notificacionSis(error));
    }  
  };

  const deleteServicio = async (req, res = response) => {
    try {
      const { id } = req.params;
      const {estado} =  await Servicio.findById(id);
      const servicio = await Servicio.findByIdAndUpdate(id, { estado: !estado });

      !estado===true
      ?res.status(202).json(notificacionOK("Servicio habilitado correctamente"))
      :res.status(202).json(notificacionOK("Servicio deshabilitado correctamente")) 

    } catch (error) {
      res.status(500).json(notificacionSis(error));
    }
  };

  module.exports={
    postServicio,
    getServicio,
    getServicioEspecifico,
    putServicio,
    deleteServicio,
}