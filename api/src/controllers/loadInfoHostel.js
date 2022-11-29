const data = require("../Info Hostel/data.js");
const { Room, Rent, Client, Type, Countrie, Faq } = require("../db.js");

const loadInfoHostel = async (req, res) => {
  //Cargar Clientes
  try {
    let infoDB = await Client.findAll();
    let infoDbRent = await Rent.findAll();
    let infoDbRoom = await Room.findAll();
    let infoDbType = await Type.findAll();
    let infoDbCountrie = await Countrie.findAll();
    let infoFaq = await Faq.findAll();

    if (
      !infoDB.length ||
      !infoDbRent.length ||
      !infoDbRoom.length ||
      !infoDbType.length ||
      !infoDbCountrie ||
      !infoFaq
    ) {
      let type = data.map((e) => e.type).flat();
      let dataType = await Type.bulkCreate(type);

      let clientes = data.map((e) => e.client).flat();
      let dataClient = await Client.bulkCreate(clientes);

      let rent = data.map((e) => e.rent).flat();
      let dataRent = await Rent.bulkCreate(rent);

      let room = data.map((e) => e.room).flat();
      let dataRoom = await Room.bulkCreate(room);

      let countries = data.map((e) => e.country).flat();
      let dataCountrie = await Countrie.bulkCreate(countries);

      let faqs = data.map((e) => e.faq).flat();
      let dataFaq = await Faq.bulkCreate(faqs);
    }
    // let idRoom = await Room.findByPk(Math.round(Math.random()*5))
    // let idType = await Type.findByPk(Math.round(Math.random()))

    //idType.addRoom(idRoom)

    // let idRoom
    // let idType
    // async function repit(){
    //   for(let i =1;i<6;i++){
    //   idRoom = await Room.findByPk(Math.round(Math.random()*(5-1)+1))
    //   idType = await Type.findByPk(Math.round(Math.random()*(2-1)+1))
    //   await idType.addRoom(idRoom)
    // }}
    // repit()

    return res.status(200).json("Base de datos completa");
  } catch (e) {
    console.log(e);
    res.status(400).json(e);
  }
};

module.exports = { loadInfoHostel };
