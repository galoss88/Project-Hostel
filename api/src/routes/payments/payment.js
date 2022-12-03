const { Router } = require("express");
const route = Router();
const mercadopago = require("mercadopago");
require("dotenv").config();
const { Room, Rent } = require("../../db");
route.post("/", async (req, res, next) => {
  //tokens de prueba
  //APP_USR-3953691119722438-110705-8aa9c78385a42cb1b8a52623939155f8-1230124929
  //TEST-3953691119722438-110705-5a73c90c16e5a96a9e786f5d1bdb5ccd-1230124929

  let ACCESS_TOKEN =
    "APP_USR-3953691119722438-110705-8aa9c78385a42cb1b8a52623939155f8-1230124929";
  // let ACCESS_TOKEN =
  //   "TEST-2829806368674986-110601-e3f4da7d9a93e2cdd21ac11dae7e5b62-396094346";
  // "TEST-3953691119722438-110705-5a73c90c16e5a96a9e786f5d1bdb5ccd-1230124929";
  let items = req.body.items;
  var user = req.body.user;
  let numero = req.body.user.identification.number;
  let date = new Date();
  let day = parseInt(date.getDate());
  let  mes = parseInt(date.getMonth());
  let yyy = parseInt(date.getFullYear());
  console.log("fechaaa", day, mes+1, yyy)
  try {
    //MANEJO DE ERRORES
    if (!items[0].title) return res.status(400).send("Debe tener titulo");
    if (!items[0].quantity)
      return res.status(400).send("Debe tener alguna cantidad");
    if (!items[0].unit_price) return res.status(400).send("Debe tener precio");
    if (!items[0].room_id)
      return res.status(400).send("Debe traer el id de la habitacion");
    if (items[0].check_in === "0" || items[0].check_out === "0")
      return res
        .status(400)
        .send("Debe tener fecha tanto de ingreso como de salida");

    user.identification.number = toString(user.identification.number);

    mercadopago.configure({
      access_token: ACCESS_TOKEN,
    });

    let preference = {
      items: items,
      back_urls: {
        success: `https://hostel-project.vercel.app/feedback/?email=${user.email}&&check_in=${items[0].check_in}&&check_out=${items[0].check_out}&&dni=${numero}&&name=${user.name}&&lastname=${user.lastname}&&camas=${items[0].quantity}`,
        failure: `https://hostel-project.vercel.app/feedback/?email=${user.email}&&check_in=${items[0].check_in}&&check_out=${items[0].check_out}&&dni=${numero}&&name=${user.name}&&lastname=${user.lastname}&&camas=${items[0].quantity}`,
        pending: `https://hostel-project.vercel.app/feedback/?email=${user.email}&&check_in=${items[0].check_in}&&check_out=${items[0].check_out}&&dni=${numero}&&name=${user.name}&&lastname=${user.lastname}&&camas=${items[0].quantity}`

        // success: `http://localhost:5173/feedback/?email=${user.email}&&check_in=${items[0].check_in}&&check_out=${items[0].check_out}&&dni=${numero}&&name=${user.name}&&lastname=${user.lastname}&&camas=${items[0].quantity}`,
        // failure: `http://localhost:5173/feedback/?email=${user.email}&&check_in=${items[0].check_in}&&check_out=${items[0].check_out}&&dni=${numero}&&name=${user.name}&&lastname=${user.lastname}&&camas=${items[0].quantity}`,
        // pending: `http://localhost:5173/feedback/?email=${user.email}&&check_in=${items[0].check_in}&&check_out=${items[0].check_out}&&dni=${numero}&&name=${user.name}&&lastname=${user.lastname}&&camas=${items[0].quantity}`,
      },
      payer: user,

      auto_return: "all",
    };

    try {
      const response = await mercadopago.preferences.create(preference);
      const responds = {
        id: response.body.id,
        init: response.body.init_point,
      };
      //CREACION DE FACTURA
      let comprobante = await Rent.create({
        pago_id: responds.id,
        dateIn: items[0].check_in,
        dateOut: items[0].check_out,
        price: items[0].unit_price * items[0].quantity,
        observation: items[0].quantity,
        bed_id: items[0].room_id,
        client_id: items[0].client_id,
        dateReserva: new Date(yyy-1, mes+1, day)
      });
      console.log(comprobante)
      res.send(responds);
    } catch (error) {
      console.log(error);
    }
  } catch (error) {
    console.log(error);
  }
});

module.exports = route;
