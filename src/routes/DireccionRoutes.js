const express = require("express");
const { getAllDirecciones,createDireccion, getDireccionById,updateDireccion,deleteDireccion} = require("../controllers/DireccionController");
const router = express.Router();

router.route("/getalldirecciones").get(getAllDirecciones);
router.route("/:id").get(getDireccionById).put(updateDireccion).delete(deleteDireccion);
router.route("/").post(createDireccion);




module.exports = router;
 