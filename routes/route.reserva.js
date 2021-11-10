const { Router } = require('express');
const { check } = require('express-validator');
const { postReserva, putCancelarReserva, getReservaCliente, getReservaEspecifica } = require('../controllers');
const { existeTipoHabitacionPorId, existeReservaPorId } = require('../helpers');
const { validar_campos, validarJWT, tieneRole } = require('../middlewares');
const validarCampos = require('../middlewares/validar-campos');


const router = Router();

router.post('/',
    [
        validarJWT,
        tieneRole('USER'),
        check('fecha_inicio', 'la fecha de inicio de la reserva en obligatoria').notEmpty(),
        check('fecha_fin', 'la fecha de cierre de la reserva en obligatoria').notEmpty(),
        check('tipo_habitacion', 'el id de tipo de habitacion de obligatorio').notEmpty(),
        check('tipo_habitacion', 'el id de tipo de habitacion debe ser valido').isMongoId(),
        check('tipo_habitacion').custom(existeTipoHabitacionPorId),
        validar_campos
    ], postReserva)

router.delete('/cancelar/:id',
    [
        validarJWT,
        tieneRole('USER'),
        validar_campos
    ], putCancelarReserva);

router.get('/',
    [
        validarJWT,
        tieneRole('USER'),
        validar_campos
    ], getReservaCliente)

router.get('/:id',
    [
        // validarJWT,
        // esAdminRole,
        check("id", 'No es un ID valido').isMongoId(),
        check("id").custom(existeReservaPorId),
        validarCampos
    ], getReservaEspecifica);

module.exports = router;

