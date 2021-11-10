const { Rol, Usuario, Habitacion, Tipo_habitacion, Servicio, Gasto } = require("../models");



// Role model validations


const esRoleValido = async (rol = '') => {
    const existeRol = await Rol.findOne({ rol });
    if (!existeRol) {
        throw new Error(`El rol ${rol} no esta registrado en la BD`);
    }
}


//  Usuario validations

const emailExiste = async (correo = '') => {
    const existeEmail = await Usuario.findOne({ correo });
    if (existeEmail) {
        throw new Error(`El correo ya esta registrado`)
    }
}

const existeUsuarioPorId = async (id) => {
    const existeUsuario = await Usuario.findById(id);
    if (!existeUsuario) {
        throw new Error(`El ID no existe`)
    }
}

// Tipo Habitacion validations
const existeTipoHabitacionPorId = async (id) => {

    const existeId = await Tipo_habitacion.findById(id);
    if (!existeId) {
        throw new Error(`El ID no existe`)
    }
}
const Tipo_habitacion_Existe = async (categoria = '') => {

    const existeTipoHabitacion = await Tipo_habitacion.findOne({ categoria });
    if (existeTipoHabitacion) {
        throw new Error(`El tipo de habitacion ya esta registrado`)
    }
}


// Habitacion validations

const  existeNumeroHabitacion = async (numero) => {
  
    const existeNumero = await Habitacion.findOne({numero})
    if (existeNumero) {
        throw new Error(`El numero de habitación ya esta registrado `)
    }
}

const existeHabitacionPorId = async (id) => {

    const existeId = await Habitacion.findById(id);
    if (!existeId) {
        throw new Error(`El ID no existe`)
    }
}


// Gasto validations

const existeGastoPorId = async (id) => {

    const existeId = await Gasto.findById(id);
    if (!existeId) {
        throw new Error(`El ID no existe`)
    }
}

// Servicios validations

const existeServicioPorNombre = async (nombre) => {

    const existe = await Servicio.findOne({nombre: firstUpper(nombre)});
    if (existe) {
        throw new Error(`El Servicio con nombre ${nombre} ya se encuentra registrado`)
    }
}


const existeServicioPorId = async (id) => {

    const existeId = await Servicio.findById(id);
    if (!existeId) {
        throw new Error(`El ID no existe`)
    }
}


// Reserva validation

const existeReservaPorId = async (id) => {

    const existeId = await Reserva.findById(id);
    if (!existeId) {
        throw new Error(`El ID no existe`)
    }
}



// Validar colecciones permitidas

const coleccionPermitida=(coleccion='', colecciones=[])=>{
    const incluida = colecciones.includes(coleccion);
    if(!incluida){
        throw new Error (`La coleccion ${coleccion} no es permitida, ${colecciones}`);
    }

    return true;
}

module.exports = {
    esRoleValido,
    emailExiste,
    existeUsuarioPorId,
    existeTipoHabitacionPorId,
    existeNumeroHabitacion,
    coleccionPermitida,
    Tipo_habitacion_Existe,
    existeHabitacionPorId,
    existeServicioPorNombre,
    existeServicioPorId,
    existeReservaPorId,
    existeGastoPorId
}