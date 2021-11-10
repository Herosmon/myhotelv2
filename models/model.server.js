const express = require('express')
const cors = require('cors');


const { dbConnection } = require("../database/config");

class Server {
    constructor() {

        this.app = express();
        this.port = process.env.PORT;
        this.paths = {
            auth: '/myhotel/auth',
            rol: '/myhotel/rol',
            usuario: '/myhotel/usuario',
            habitacion: '/myhotel/habitacion',
            tipo_habitacion: '/myhotel/tipoH',
            upload: '/myhotel/upload',
            servicio: '/myhotel/servicio',
            reserva: '/myhotel/reserva',
            gasto: '/myhotel/gasto',
            facturacion: '/myhotel/factura',
            reporte: '/myhotel/reporte'
        }
        //conexión DB
        this.conectarBD();
        // middlewares
        this.middlewares();
        //rutas de mi aplicación
        this.routes();


    }

    middlewares() {
        //CORS
        this.app.use(cors());
        //Lectura y Parseo del body
        this.app.use(express.json());
        //directorio publico
        this.app.use(express.static('public'));
    }

    async conectarBD() {
        await dbConnection();
    }

    routes() {
        this.app.use(this.paths.auth, require('../routes').auth);
        this.app.use(this.paths.usuario, require('../routes').usuario);
        this.app.use(this.paths.rol, require('../routes').rol);
        this.app.use(this.paths.habitacion, require('../routes').habitacion);
        this.app.use(this.paths.upload, require('../routes').upload);
        this.app.use(this.paths.tipo_habitacion, require('../routes').tipo_habitacion);
        this.app.use(this.paths.gasto, require('../routes').gasto);
        this.app.use(this.paths.servicio, require('../routes').servicio);
        this.app.use(this.paths.facturacion, require('../routes').facturacion);
        this.app.use(this.paths.reporte, require('../routes').reporte);
        this.app.use(this.paths.reserva, require('../routes').reserva);
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('Servidor corriendo en puerto', this.port);
        });
    }
}


module.exports = Server;