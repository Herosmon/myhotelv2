const { Router } = require("express");
const { check } = require("express-validator");
const { postHabitacion, getHabitacionLibre, getHabitacionLibrePorTipo, putHabitacion, getHabitacionEspecifico, deleteHabitacion } = require("../controllers");
const { existeHabitacionPorId, existeNumeroHabitacion, existeTipoHabitacionPorId } = require("../helpers");
const { validarJWT, esAdminRole, validar_campos, tieneRole } = require("../middlewares");


const router = Router();


router.post(
    "/",
    [
        validarJWT,
        esAdminRole,
        check('numero', "El numero de habitacion es obligatorio").not().isEmpty(),
        check('numero').custom(existeNumeroHabitacion),
        check('tipo_habitacion').isMongoId(),
        check('tipo_habitacion').custom(existeTipoHabitacionPorId),
        validar_campos
    ]
    , postHabitacion
)

router.get(
    "/",
    getHabitacionLibre
)

router.get(
    "/tipo/:id",
    [check('id').isMongoId(),]
    , getHabitacionLibrePorTipo
)

router.get('/:id', [
    // validarJWT,
    // esAdminRole,
    check("id", 'No es un ID valido').isMongoId(),
    check("id").custom(existeHabitacionPorId),
    validar_campos
]
    , getHabitacionEspecifico);


router.put(
    "/:id",
    [
        validarJWT,
        tieneRole('ADMIN', 'AUX'),
        check("id", 'No es un ID valido').isMongoId(),
        check("id").custom(existeHabitacionPorId),
        validar_campos
    ]
    , putHabitacion
)


router.delete('/:id', [
    validarJWT,
    tieneRole('ADMIN', 'AUX'),
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom(existeHabitacionPorId),
    validar_campos,
], deleteHabitacion);


module.exports = router;
