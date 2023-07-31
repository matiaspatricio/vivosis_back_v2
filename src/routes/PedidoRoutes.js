const express = require("express");
const { getAllPedidos,createPedido, getPedidoById,updatePedido,deletePedido} = require("../controllers/PedidoController");
const router = express.Router();

router.route("/getallpedidos").get(getAllPedidos);
router.route("/:id").get(getPedidoById).put(updatePedido).delete(deletePedido);
router.route("/").post(createPedido);




module.exports = router;
 