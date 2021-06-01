const nodemailer = require("nodemailer");

// async..await is not allowed in global scope, must use a wrapper

  // create reusable transporter object using the default SMTP transport
 let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: "javiermtdam@gmail.com", // user
      pass: "qxbvztwvufoeeoav", // password
    },
  });

  // send mail with defined transport object
  transporter.sendMail({
    from: '"Contraseña Olvidada" <javiermt@gestiongastos.com>', // sender address
    to: "javiermt98@gmail.com", // list of receivers
    subject: "Hello ✔", // Subject line
    html:` 
    <br>La contraseña asociada con su cuenta de Aplicación de Gastos es: </br> 
    <br>Usuario: javiermt98@gmail.com</br>
    <br>Contraseña: javier123 </br>`

  });
