
const nodemailer = require("nodemailer");



 
  const  transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL_MAILER, // generated ethereal user
      pass: process.env.PASSWORD_MAILER, // generated ethereal password
    },
  });

  transporter.verify().then(()=>{
      console.log("Listos para enviar emails");
  })

  const plantillaCorreoRecuperacion=(correo,reset)=>{
    return {
      from: '"Recuperar Contraseña" <jdmorenov@correo.udistrital.edu.co>',
      to: correo, // list of receivers
      subject: "Recuperar Contraseña", // Subject line

      html: `
                  <b>Please click on the following link</b>
                  <a href='${reset}'>Link Verificación</a>
              `,
    }
  }

  module.exports={
    transporter,
    plantillaCorreoRecuperacion
  }