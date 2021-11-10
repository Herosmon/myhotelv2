const { response, request } = require("express");
const moment = require("moment");
const { notificacionOK, notificationError, notificacionSis } = require("../helpers");
const { Reserva, Tipo_habitacion, Habitacion } = require("../models");

const postReserva = async (req = request, res = response) => {
    try {
        const { tipo_habitacion, fecha_inicio, fecha_fin } = req.body;
        const usuario = (req.usuario.id);

        // VALIDACION DE FECHAS 
        const hoy = moment().format("YYYY-MM-D");
        const fi = moment(fecha_inicio).format("YYYY-MM-D");
        const ff = moment(fecha_fin).format("YYYY-MM-D");

        if (!moment(fecha_inicio).isSameOrAfter(hoy)) {
            return res.status(402).json(
                notificationError('Error fecha inicial', 'La fecha debe ser igual o posterior a la actual'))
        }
        if (!moment(fecha_fin).isAfter(hoy)) {
            return res.status(402).json(
                notificationError('Error fecha fin', 'La fecha debe ser posterior a la actual'))
        }
        const cantidad_dias = moment(fecha_fin).diff(fecha_inicio, "days")

        //VALIDACION HABITACION DISPONIBLE
        const query = {
            ocupado: false,
            tipo_habitacion
        };
        const hab = await Habitacion.findOne(query).populate('tipo_habitacion', 'precio');
        if (!hab) {
            return res.status(402).json(
                notificationError('Error disponibilidad habitacion', 'No hay habitaciones disponibles'))
        }

        const { precio } = hab.tipo_habitacion;
        const { id: habitacion } = hab
        const valor_total_reserva = precio * cantidad_dias

        const reserva = new Reserva({
            fechaInicio: fi,
            fechaFin: ff,
            precio: valor_total_reserva,
            usuario,
            habitacion
        })
        const result = await reserva.save();

        // CAMBIAR ESTADO HABITACION
        const actulizacion = await Habitacion.findByIdAndUpdate(habitacion, { ocupado: true })
        if (!actulizacion) return res.status(500).json(notificacionSis(" actualizar estado habitacion- reserva"))
        return res.status(201).json(notificacionOK(result))
    } catch (error) {
        res.status(500).json(notificacionSis(error));
    }
};

const putCancelarReserva = async (req = request, res = response) => {
    try {
        const { id } = req.params;

        const user = (req.usuario.id);
        const { usuario } = await Reserva.findById(id);
        if (!usuario == user) {
            return res.status(401).json(
                notificationError('Error', 'Usted no tiene permiso para realizar esta acción'))
        }
        const data = await Reserva.findByIdAndUpdate(id, { estado: 'cancelada' })
        await Habitacion.findByIdAndUpdate(data.habitacion, { ocupado: false })
        return res.status(202).json(notificacionOK('Reserva Cancelada'))
    } catch (error) {
        return res.status(500).json(notificacionSis(error))
    }
}


const getReservaCliente = async (req = request, res = response) => {
    try {
        const usuario = (req.usuario.id);
        let servicio = await Reserva.find({ usuario, estado: 'activa' }).populate('habitacion', 'numero')
        servicio = servicio.reverse();
        res.json(notificacionOK(servicio));
    } catch (error) {
        res.status(500).json(notificacionSis(error));
    }
}

const getReservaEspecifica = async (req, res = response) => {
    try {
        const { id } = req.params;
        let reserva = await Reserva.findById(id).populate('habitacion');
        let { habitacion } = reserva;
        const { categoria, img } = await Tipo_habitacion.findById(habitacion.tipo_habitacion);
        const tipo_habitacion = { categoria, img };
        res.json(notificacionOK({ reserva, tipo_habitacion }));
    } catch (error) {
        res.status(500).json(notificacionSis(error));
    }
};

module.exports = {
    postReserva,
    putCancelarReserva,
    getReservaCliente,
    getReservaEspecifica
  };
  
