
const { Router } = require("express");
const router = Router();
const {Rent} = require("../../db");

router.get("/", async (req, res) =>{
    let {id} = req.query;

    try {
        let rent = await Rent.findAll({
          where: {
            bed_id: id
          }  
        })

        res.send(rent)

    } catch (error) {
        console.log(error)
    }

});




module.exports = router;
