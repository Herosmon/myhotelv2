const { response, request } = require("express");
const { Rol } = require("../models");
const { notificacionSis, notificacionOK } = require("../helpers");

const postRol= async(req,res=response)=>{
    try {
        const{rol}= req.body;
        const role= new Rol({rol});
        await role.save();
        res.json(notificacionOK(rol))   
    } catch (error) {
        res.status(500).json(notificacionSis(error));
    }
}


module.exports={
    postRol
}