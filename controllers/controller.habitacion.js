const { response, request } = require("express");
const { notificacionSis, notificacionOK } = require("../helpers");
const { Habitacion } = require("../models");


const getHabitacionLibre = async (req, res = response) => {
    try {
        const { limite = 5, desde = 0 } = req.query;
        const query = { ocupado: false };

        const [total, habitacion] = await Promise.all([
            Habitacion.countDocuments(query),
            Habitacion
                .find(query)
                .populate('tipo_habitacion', 'categoria')
                .skip(Number(desde))
                .limit(Number(limite)),
        ]);
        res.json(
            notificacionOK({ total, habitacion, })
        );
    } catch (error) {
        res.status(500).json(notificacionSis(error));
    }
}
const getHabitacionLibrePorTipo = async (req, res = response) => {
    try {
        const { limite = 5, desde = 0 } = req.query;
        const { id } = req.params;
        const query = {
            ocupado: false,
            tipo_habitacion: id
        };

        const [total, habitacion] = await Promise.all([
            Habitacion.countDocuments(query),
            Habitacion.find(query).skip(Number(desde)).limit(Number(limite)),
        ]);
        res.json(notificacionOK({ total, habitacion }));
    } catch (error) {
        res.status(500).json(notificacionSis(error));
    }
}

const getHabitacionEspecifico = async (req, res = response) => {
    try {
        const { id } = req.params;

        let habitacion = await Habitacion.findById(id)
            .populate('tipo_habitacion')
        const { categoria, img } = habitacion.tipo_habitacion;
        habitacion.tipo_habitacion = { categoria, img }

        res.json(notificacionOK({ habitacion }));

    } catch (error) {
        res.status(500).json(notificacionSis(error));
    }
};

const postHabitacion = async (req, res = response) => {
    try {
        const { numero, tipo_habitacion } = req.body;
        const habitacion = new Habitacion({
            numero,
            tipo_habitacion
        });
        //guardar en DB
        await habitacion.save();
        res.json(notificacionOK({ habitacion }));
    } catch (error) {
        res.status(500).json(notificacionSis(error));
    }
};
const putHabitacion = async (req, res = response) => {
    try {
        const { id } = req.params;
        const { _id, ...resto } = req.body;
        await Habitacion.findByIdAndUpdate(id, resto);
        res.status(201).json(notificacionOK("Datos actulizados correctamente -Habitacion"));

    } catch (error) {
        res.status(500).json(notificacionSis(error));
    }
};

const deleteHabitacion = async (req, res = response) => {
    try {
        const { id } = req.params;

        const { ocupado } = await Habitacion.findById(id);
        const habitacion = await Habitacion.findByIdAndUpdate(id, { ocupado: !ocupado });


        !ocupado === false
            ? res.json(notificacionOK('Habitacion habilitada correctamente'))
            : res.json(notificacionOK('Habitacion inhabilitada correctamente'))


    } catch (error) {
        res.status(500).json(notificacionSis(error));
    }
};

module.exports = {
    getHabitacionLibre,
    getHabitacionEspecifico,
    getHabitacionLibrePorTipo,
    postHabitacion,
    putHabitacion,
    deleteHabitacion
}