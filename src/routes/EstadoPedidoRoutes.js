const express = require("express");
const { getAllEstadosPedido,createEstadoPedido, getEstadoPedidoById,updateEstadoPedido,deleteEstadoPedido} = require("../controllers/EstadoPedidoController");
const router = express.Router();

router.route("/getallestadosPedido").get(getAllEstadosPedido);
router.route("/:id").get(getEstadoPedidoById).put(updateEstadoPedido).delete(deleteEstadoPedido);
router.route("/").post(createEstadoPedido);




module.exports = router;
 