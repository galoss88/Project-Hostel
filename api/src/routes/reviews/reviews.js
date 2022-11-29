const { Router } = require("express");
const {postReviews, getReviews} = require("../../controllers/reviews.js");
const router = Router();
router.get("/", getReviews);
router.post("/", postReviews);


module.exports = router;
