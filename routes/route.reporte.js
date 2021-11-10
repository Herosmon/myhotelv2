const {Router}= require('express');
const { getReporteServicio, getReporteTipoHabitacionHotel, getReporteClienteFrecuente } = require('../controllers');
const { validarJWT, tieneRole, validar_campos } = require('../middlewares');

const router = Router();

router.get('/servicio',
[
     validarJWT,
     tieneRole('ADMIN','AUX'),
     validar_campos
]
,getReporteServicio);

router.get('/tipo_habitacion',
[
    validarJWT,
    tieneRole('ADMIN','AUX'),
    validar_campos
]
,getReporteTipoHabitacionHotel);

router.get('/cliente_frecuente',
[
    validarJWT,
    tieneRole('ADMIN','AUX'),
    validar_campos
]
,getReporteClienteFrecuente)


module.exports = router;