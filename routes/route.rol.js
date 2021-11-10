const { Router } = require('express');
const { check } = require('express-validator');

const { postRol } = require('../controllers');
const { esAdminRole, validarJWT, validar_campos } = require('../middlewares');


const router = Router();

router.post('/',
    [
        validarJWT,
        esAdminRole,
        check('rol', 'El rol es obligatorio').not().isEmpty(),
        validar_campos
    ]
    , postRol)

module.exports = router;