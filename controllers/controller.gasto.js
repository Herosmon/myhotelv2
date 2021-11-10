const { response, request } = require("express");
const moment = require("moment");
const { notificacionOK, notificacionSis } = require("../helpers");
const { Servicio, Gasto } = require("../models");

const postGasto= async (req=request,res=response)=>{
    try {
     const {reserva}=req.params
     const {servicio}=req.body
     const {precio}= await Servicio.findById(servicio);
     const hoy = moment().format("YYYY-MM-D h:mm:ss");
 
     const data=new Gasto({
         valor_total:precio,
         fecha:hoy,
         servicio,
         reserva
     });
 
     const newGasto= await data.save();
     return res.status(200).json(notificacionOK( newGasto))
 
 
    } catch (error) {
     res.status(500).json(notificacionSis(error));
    }
 
 }

 module.exports={
    postGasto
}
 