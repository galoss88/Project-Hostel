const {Router} = require("express");
const getAllClients = require("../../controllers/getAllClients.js")
const router = Router();

router.get("/",getAllClients)


module.exports=router;