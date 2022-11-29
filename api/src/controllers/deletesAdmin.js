const { Review, Room } = require("../db.js");

const deleteReview = async (req, res) => {
  try {
    let { id, recOrDelete } = req.query;

    let findId = await Review.findByPk(id);
    if (recOrDelete === "eliminar") {
      await findId.update({ status: true });
      await findId.save();
    } else {
      if (recOrDelete === "recuperar") await findId.update({ status: false });
      await findId.save();
    }

    // console.log(findId)
    // findId.status = true;

    // await Review.destroy({where:{id}})
    res.status(200).json("Review Eliminado logico");
  } catch (e) {
    res.status(400).json("No se pudo eliminar");
  }
};

const changeStatusRoom = async (req, res) => {
  try {
    let { id, statusRoom } = req.query;
    let findId = await Room.findByPk(id);
    if (statusRoom === "activo") {
      await findId.update({ status: false });
      await findId.save();
    } else {
      if (statusRoom === "inactivo") {
        await findId.update({ status: true });
        await findId.save();
      }
    }
    res.status(200).json("Habitacion actualizada");
  } catch (e) {
    res.status(400).json("No se pudo actualizar");
  }
};

const deleteRoom = async (req, res) => {
  try {
    let { id } = req.query;
    let findId = await Room.findByPk(id);
    await findId.destroy();
    res.status(200).json("Habitacion Borrada");
  } catch (e) {
    res.status(400).json("No se pudo eliminar");
  }
};

module.exports = { deleteReview, deleteRoom, changeStatusRoom };
