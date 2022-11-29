const {Router} = require("express");
const router = Router();
const controllers = require("../../controllers/index")

/////////////permissos
const checkPermissions = require("../../permisos/permisosCheck")
const itemPermissos = require('../../permisos/permisos')

router.post("/post",checkPermissions(itemPermissos.addDataAdmin), async (req, res) => {
    try {
        return controllers.postOwner(req.body)
            .then((result) => {
                return res.status(201).json(result)
            })
    } catch (error) {
        return res.status(400).send(error)
    }
})
router.get("/get",checkPermissions(itemPermissos.addDataAdmin), (req, res) => {
    try {
        return controllers.getOwner()
            .then((result) => {
                return res.status(201).json(result)
            })
    } catch (error) {
        return res.status(400).send(error)
    }
})
router.get("/gethome", (req, res) => {
    try {
        return controllers.getOwnerHome()
            .then((result) => {
                return res.status(201).json(result)
            })
    } catch (error) {
        return res.status(400).send(error)
    }
})
module.exports = router;