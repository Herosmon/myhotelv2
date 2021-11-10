

const notificacionSis= (error)=>{
return {
        msg: "Error",
        description: `Error del sistema: ${error}`,
      }
}

const notificacionOK=(data)=>{
  return {
    msg: "OK",
    description: [data],
  }
}

const notificationError=(msg,description)=>{
  return {
    msg,
    description
  }
}


module.exports={
    notificacionSis,
    notificacionOK,
    notificationError
}