const { Router } = require("express");
const { deleteReview } = require("../../controllers/deletesAdmin");
const { deleteRoom } = require("../../controllers/deletesAdmin");
const { changeStatusRoom } = require("../../controllers/deletesAdmin");
const router = Router();

router.get("/deleteReview", deleteReview);
router.get("/deleteRoom", deleteRoom);
router.get("/", changeStatusRoom)

module.exports = router;
