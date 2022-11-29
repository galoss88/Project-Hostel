const {Router} = require("express");
const router = Router();
const controllers = require("../../controllers/index")

router.get("/", (req, res) => {
    try {
        return controllers.getCountries()
            .then((result) => {
                return res.status(201).json(result)
            })
    } catch (error) {
        return res.status(400).send(error)
    }
})
module.exports = router;