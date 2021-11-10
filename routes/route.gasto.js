const { Router } = require('express');
const { check } = require('express-validator');
const { postGasto } = require('../controllers');
const { existeGastoPorId, existeServicioPorId } = require('../helpers');
const { validarJWT, validar_campos, tieneRole } = require('../middlewares');

const router = Router();

router.post('/:reserva',
    [
        validarJWT,
        tieneRole('USER'),
        check('reserva', 'El id de reserva es obligatorio').not().isEmpty(),
        check('reserva', 'El id de reserva no es valido').isMongoId(),
        check('servicio', 'El id de reserva es obligatorio').not().isEmpty(),
        check('servicio', 'El id de reserva no es valido').isMongoId(),
        check("servicio").custom(existeServicioPorId),
        validar_campos
    ]
    , postGasto)

module.exports = router;