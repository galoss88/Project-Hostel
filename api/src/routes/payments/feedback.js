const { Router } = require("express");
const route = Router();
const { Rent, Client, Room } = require("../../db");
require("dotenv").config();
const { sendEmail } = require("./sendEmail");

route.get("/", async (req, res) => {
  const preference_id = req.query.preference_id;
  const payment_status = req.query.status;
  const {email, check_in, check_out, dni, name, lastname, camas, 
        payment_id, status} = req.query;
  if(!email) return res.status(404).send("Falta un email");
  if(!check_in) return res.status(404).send("Falta fecha de entrada");
  if(!check_out) return res.status(404).send("Falta fecha de salida");
  if(!dni) return res.status(404).send("Falta dni del usuario");
  if(!name) return res.status(404).send("Falta nombre del usuario");
  if(!lastname) return res.status(404).send("Falta apellido del usuario");
  if(!camas) return res.status(404).send("Falta cantidad de camas");
  if(!payment_id) return res.status(404).send("Falta id del pago");
  if(!status) return res.status(404).send("Falta estado del pago");
  sendEmail(req.query);
  try {
    if (payment_status === "approved") {
      let pagado = await Rent.findOne({
        where: {
          pago_id: preference_id,
        },
      });

      let room = await Room.findOne({
        where: {
          id: pagado.bed_id,
        },
      });

      let client = await Client.findOne({
        where: {
          id: pagado.client_id,
        },
      });
      room.beds_avalaibles = room.beds_avalaibles - pagado.observation;
      if (room.beds_avalaibles <= 0) {
        room.beds_avalaibles = 0;
        room.status = true;
      }
      client.addRent(pagado);
      await room.save();

      res.send("bien");
    } else {
      let cancelado = await Rent.findOne({
        where: {
          pago_id: preference_id
        }
      })
      await cancelado.destroy();
      res.send("nada");
    }
  } catch (error) {
    console.log(error);
    res.send(error);
  }
});

module.exports = route;

