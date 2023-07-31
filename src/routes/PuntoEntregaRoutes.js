const express = require("express");
const {getAllPuntosEntrega,createPuntoEntrega,getPuntoEntregaById,updatePuntoEntrega,deletePuntoEntrega} = require("../controllers/PuntoEntregaController");
const router = express.Router();

router.route("/getallpuntosentrega").get(getAllPuntosEntrega);
router.route("/:id").get(getPuntoEntregaById).put(updatePuntoEntrega).delete(deletePuntoEntrega);
router.route("/").post(createPuntoEntrega);




module.exports = router;
 