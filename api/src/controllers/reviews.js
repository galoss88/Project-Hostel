const { Review, Client } = require("../db.js");
const { find } = require("../Info Hostel/data.js");

const postReviews = async (req, res) => {
  try {
    let { rating, description, usuario } = req.body;
    const data = await Review.create({
      rating,
      description,
    });
    let user = await Client.findOne({ where: { name: usuario } });

    await user.addReview(data);
    res
      .status(200)
      .json(`Gracias ${usuario} por tu review!! Que tengas buen dia!`);
  } catch (e) {
    res.json(e);
  }
};

const getReviews = async (req, res) => {
  try {
    const data = await Review.findAll({
      include: { model: Client, attributes: ["name"] },
    });

    res.status(200).json(data);
  } catch (e) {
    console.log(e.message);
    res.status(400).json(e);
  }
};

module.exports = { postReviews, getReviews,};
