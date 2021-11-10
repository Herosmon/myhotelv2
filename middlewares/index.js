const validar_campos = require('./validar-campos')
const validar_JWT= require('./validar-jwt')
const validar_rol= require('./validar-roles')

module.exports={
    validar_campos,
   ...validar_JWT,
   ...validar_rol

}