const { Router } = require('express');
const { check } = require('express-validator');
const { getServicio, getServicioEspecifico, postServicio, putServicio, deleteServicio } = require('../controllers');
const { existeServicioPorId, existeServicioPorNombre } = require('../helpers');
const { validar_campos, validarJWT, tieneRole } = require('../middlewares');


const router = Router();

router.get('/', getServicio)

router.get('/:id', [
    // validarJWT,
    // esAdminRole,
    check("id", 'No es un ID valido').isMongoId(),
    check("id").custom(existeServicioPorId),
    validar_campos
]
    , getServicioEspecifico);

router.post('/',
    [
        // validarJWT,
        // esAdminRole,
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('descripcion', 'La descripcion es obligatoria').not().isEmpty(),
        check('precio', 'El precio es obligatorio').not().isEmpty(),
        check('nombre').custom(existeServicioPorNombre),
        validar_campos
    ]
    , postServicio)

router.put('/:id', [
    validarJWT,
    tieneRole('ADMIN', 'AUX'),
    check('id', 'El Id es obligatorio').not().isEmpty(),
    check('id', 'El id no es valido').isMongoId(),
    check('id').custom(existeServicioPorId),
    validar_campos
], putServicio)

router.delete('/:id', [
    validarJWT,
    tieneRole('ADMIN', 'AUX'),
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom(existeServicioPorId),
    validar_campos,
], deleteServicio);

module.exports = router;
