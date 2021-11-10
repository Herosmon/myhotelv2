const usuario = require('./controller.usuarios');
const auth= require('./controller.auth');
const facturacion= require('./controller.facturacion');
const gasto= require('./controller.gasto');
const habitacion=require('./controller.habitacion');
const reporte=require('./controller.reporte');
const reserva=require('./controller.reserva'); 
const rol= require('./controller.rol');
const servicio=require('./controller.servicio');
const tipo_habitacion=require('./controller.tipo-habitacion');
const upload=require('./controller.upload')

module.exports={
    ...usuario,
    ...auth,
    ...rol,
    ...habitacion,
    ...upload,
    ...tipo_habitacion,
    ...gasto,
    ...servicio,
    ...facturacion,
    ...reporte,
    ...reserva
}