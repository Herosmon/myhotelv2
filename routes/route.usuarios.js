const { Router } = require('express');
const { check } = require('express-validator');
const { usuarioGet, getUsuarioEspecifico, usuarioPost, usuarioPut, usuarioDelete } = require('../controllers/');
const { existeUsuarioPorId, esRoleValido, emailExiste } = require('../helpers');
const { validar_campos, validarJWT, esAdminRole } = require('../middlewares');

const router = Router();

router.get('/', usuarioGet);

router.get('/:id', [
    check("id", 'No hay ID').not().isEmpty(),
    check("id", 'No es un ID valido').isMongoId(),
    check("id").custom(existeUsuarioPorId),
    validar_campos
]
    , getUsuarioEspecifico);


router.post('/',
    [
        check('nombre', 'El nombre es obligatorio').notEmpty(),
        check('apellido', 'El apellido es obligatorio').notEmpty(),
        check('correo', 'El correo ingresado no es valido').isEmail(),
        check('correo').custom(emailExiste),
        check('clave', 'La clave debe tener al menos 6 letras').isLength({ min: 6 }),
        check('rol').custom(esRoleValido),
        validar_campos
    ],
    usuarioPost);

router.put('/:id',
    [
        validarJWT,
        check('id', 'No es un ID valido').isMongoId(),
        check('id').custom(existeUsuarioPorId),
        validar_campos,
    ], usuarioPut);


router.delete('/:id',
    [
        validarJWT,
        esAdminRole,
        check('id', 'No es un ID valido').isMongoId(),
        check('id').custom(existeUsuarioPorId),
        validar_campos,
    ], usuarioDelete);

module.exports = router;