const { Router } = require("express");
const router = Router();
const controllers = require("../../controllers/index.js");

//RUTA PARA TRAER DATOS DE LAS HABITACIONES DE LA DB (No comentar)
router.get("/", (req, res) => {
  try {
    return controllers.getRoomInfo().then((result) => {
      return res.status(201).json(result);
    });
  } catch (error) {
    return res.status(400).send(error);
  }
});
//RUTA PARA POSTEAR DATOS DE LAS HABITACIONES A LA DB
router.post("/", (req, res) => {
  let { beds, description, image, bathroom, price, observation, typeId } = req.body;
  try {
    return controllers
      .postRoomInfo(beds, description, image, bathroom, price, observation,typeId)
      .then(() => {
        return res.send("Room created");
      });
  } catch (error) {
    res.status(400).send(error);
  }
});
module.exports = router;
