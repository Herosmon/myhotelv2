const usuario = require('./route.usuarios')
const auth = require('./route.auth')
const rol = require('./route.rol')
const habitacion = require('./route.habitacion')
const upload = require('./route.upload')
const tipo_habitacion = require('./route.tipo_habitacion')
const gasto = require('./route.gasto')
const servicio = require('./route.servicio')
const facturacion = require('./route.facturacion')
const reporte = require('./route.reporte')
const reserva = require('./route.reserva')

module.exports = {
    auth,
    usuario,
    rol,
    habitacion,
    upload,
    tipo_habitacion,
    gasto,
    servicio,
    facturacion,
    reporte,
    reserva
}