const nodemailer = require("nodemailer");
require("dotenv").config();
const { aprobado, rechazado } = require("./plainHTML");

let transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true, // true for 465, false for other ports
  auth: {
    user: process.env.TOKENEMAIL, // generated ethereal user
    pass: process.env.PAS, // generated ethereal password
  },
});

const sendEmail = async ({
  email,
  name,
  lastname,
  status,
  dni,
  camas,
  payment_id,
  check_in,
  check_out,
}) => {
  let contHTML;
  status == "approved"
    ? (contHTML = aprobado({
      name,
      lastname,
      status,
      dni,
      camas,
      payment_id,
      check_in,
      check_out,
    }))
    : (contHTML = rechazado({ name, status }));
  await transporter.sendMail({
    from: '"Confirmacion de Pago" <Projecto_finalXDXD@gmail.com>',
    to: email,
    subject: "Payment Dinamita",
    text: "Dinamita hostel Payment",
    html: contHTML,
  });
};

module.exports = { sendEmail };
