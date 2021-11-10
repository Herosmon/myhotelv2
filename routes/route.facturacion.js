const { Router } = require('express');
const { check } = require('express-validator');
const { postFacturacion, getFacturaPago, getListaFacturas } = require('../controllers');
const { validar_campos, validarJWT, tieneRole } = require('../middlewares');

const router = Router();

router.post('/:reserva',
    [
        validarJWT,
        tieneRole('USER'),
        validar_campos
    ]
    , postFacturacion);

router.get('/:factura',
    [
        validarJWT,
        tieneRole('USER'),
        validar_campos
    ]
    , getFacturaPago)

    router.get('/',
    [
        validarJWT,
        tieneRole('USER'),
        validar_campos
    ]
    ,getListaFacturas)
    
module.exports = router;


