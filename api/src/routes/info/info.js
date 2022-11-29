const Router = require("express")
const route = Router()
const { loadInfoHostel } = require("../../controllers/loadInfoHostel.js");
route.get("/",loadInfoHostel)

module.exports = route;