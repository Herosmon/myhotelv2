const { Router } = require('express');
const { check } = require('express-validator');
const { actualizarImagenCloudinary } = require('../controllers');
const { coleccionPermitida } = require('../helpers');
const { validar_campos } = require('../middlewares');


const router = Router();

router.put('/:coleccion/:id', [
    //  validarArchivoSubir,
    check('id', 'El ID debe de ser mongo').isMongoId(),
    check('coleccion').custom(c => coleccionPermitida(c, ['usuario', 'tipo_habitacion', 'servicio'])),
    validar_campos
], actualizarImagenCloudinary);





module.exports = router;
