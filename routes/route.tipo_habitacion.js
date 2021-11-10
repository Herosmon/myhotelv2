const { Router } = require('express');
const { check } = require('express-validator');
const { getTipoHabitacion, getTipoHabitacionEspecifico, postTipoHabitacion, putTipoHabitacion, deleteTipoHabitacion } = require('../controllers');
const { existeTipoHabitacionPorId, Tipo_habitacion_Existe } = require('../helpers');
const { validar_campos, esAdminRole, validarJWT, tieneRole } = require('../middlewares');
const validarCampos = require('../middlewares/validar-campos');


const router = Router();

router.get('/', getTipoHabitacion);

router.get('/:id', [
    // validarJWT,
    // esAdminRole,
    check("id", 'No es un ID valido').isMongoId(),
    check("id").custom(existeTipoHabitacionPorId),
    validar_campos
]
    , getTipoHabitacionEspecifico);

router.post('/',
    [
        validarJWT,
        esAdminRole,
        check('categoria', 'La categoria es obligatoria').not().isEmpty(),
        check('categoria').custom(Tipo_habitacion_Existe),
        check('precio', 'El precio es obligatorio').not().isEmpty(),
        validar_campos
    ]
    , postTipoHabitacion);

router.put('/:id', [
    validarJWT,
    tieneRole('ADMIN', 'AUX'),
    check("id", 'No es un ID valido').isMongoId(),
    check("id").custom(existeTipoHabitacionPorId),
    validar_campos
], putTipoHabitacion)

router.delete('/:id', [
    validarJWT,
    tieneRole('ADMIN', 'AUX'),
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom(existeTipoHabitacionPorId),
    validarCampos,
], deleteTipoHabitacion);

module.exports = router;
