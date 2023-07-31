const express = require("express");
const { getAllEstadosPago,createEstadoPago, getEstadoPagoById,updateEstadoPago,deleteEstadoPago} = require("../controllers/EstadoPagoController");
const router = express.Router();

router.route("/getallestadosPago").get(getAllEstadosPago);
router.route("/:id").get(getEstadoPagoById).put(updateEstadoPago).delete(deleteEstadoPago);
router.route("/").post(createEstadoPago);




module.exports = router;
 