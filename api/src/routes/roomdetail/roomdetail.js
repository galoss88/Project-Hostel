const { Router} = require('express');
const route = Router();
const {Room, Rent} = require("../../db")


route.get("/", async (req, res) =>{
    let id = req.query.id;
    try {

        let roomdetail = await Room.findOne({
            where: {
                id: id
            }
        });

        res.send(roomdetail);
        
    } catch (error) {
        console.log("entro", error);
    }
});

module.exports = route;