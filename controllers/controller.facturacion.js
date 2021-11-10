const { response, request } = require("express");
const moment = require("moment");
const { notificacionSis, notificacionOK } = require("../helpers");
const { Reserva, Tipo_habitacion, Facturacion, Gasto, Habitacion } = require("../models");



const postFacturacion = async (req = request, res = response) => {
    try {
        const { reserva } = req.params;
        const { nombre, apellido, correo, telefono } = (req.usuario._doc);
        const reservaActual = await Reserva.findById(reserva)
            .populate("habitacion");
        const { categoria } = await Tipo_habitacion.findById(reservaActual.habitacion.tipo_habitacion)
        const fecha = moment().format("YYYY-MM-D h:mm:ss");
        const gasto = await Gasto.find({ reserva }).populate('servicio', 'nombre')
        let gasto_total = 0;
        let gastosExtra = [];
        gasto.map((g) => {
            gasto_total += g.valor_total
            gastosExtra.push({

                nombre: g.servicio.nombre,
                precio: g.valor_total,
                fecha: moment(g.fecha).format("YYYY-MM-D"),
                cantidad: g.cantidad

            })
        });
        const valor_total = reservaActual.precio + gasto_total
        const factura = new Facturacion({
            valor_total,
            fecha,
            reserva,
            usuario: req.usuario.id
        });
        const { id: id_facturacion } = await factura.save();
        const data = {
            usuario: { nombre, apellido, correo, telefono },
            reserva: reservaActual,
            tipo_habitacion: { categoria },
            gastosExtra,
            facturacion: {
                valor_total,
                fecha,
                id_facturacion,
                gasto_extra_total: gasto_total.toLocaleString('de-DE'),
            }
        }
        //ACTUALIZAR HABITACION
        const finaldata = await Reserva.findByIdAndUpdate(reservaActual.id, { estado: 'finalizada' })
        await Habitacion.findByIdAndUpdate(finaldata.habitacion, { ocupado: false })

        return res.status(202).json(notificacionOK(data))

    } catch (error) {
        res.status(500).json(notificacionSis(error));
    }
};

const getFacturaPago = async (req = request, res = response) => {
    try {
        const { factura } = req.params;
        const { nombre, apellido, correo, telefono } = (req.usuario._doc);
        const facturacion = await Facturacion.findById(factura)
        const { reserva } = facturacion;
        const reservaActual = await Reserva.findById(reserva)
            .populate("habitacion");
        const { categoria } = await Tipo_habitacion.findById(reservaActual.habitacion.tipo_habitacion)
        const gasto = await Gasto.find({ reserva }).populate('servicio', 'nombre')
        let gasto_total = 0;
        let gastosExtra = [];
        gasto.map((g) => {
            gasto_total += g.valor_total
            gastosExtra.push({

                nombre: g.servicio.nombre,
                precio: g.valor_total.toLocaleString('de-DE'),
                fecha: moment(g.fecha).format("YYYY-MM-D"),
                cantidad: g.cantidad

            })
        });
        const data = {
            usuario: { nombre, apellido, correo, telefono },
            reserva: reservaActual,
            tipo_habitacion: { categoria },
            gastosExtra,
            facturacion: {
                valor_total: facturacion.valor_total.toLocaleString('de-DE'),
                fecha: facturacion.fecha,
                id_facturacion: facturacion.id,
                gasto_extra_total: gasto_total.toLocaleString('de-DE'),
            }
        }
        return res.json(notificacionOK(data));

    } catch (error) {
        res.status(500).json(notificacionSis(error));
    }
}

const getListaFacturas=async (req = request, res = response )=>{
    const usuario=(req.usuario.id);
    const facturacion= await Facturacion.find({usuario})

    return res.status(202).json({
        facturacion
    })
}


module.exports={
    postFacturacion,
    getFacturaPago,
    getListaFacturas
}