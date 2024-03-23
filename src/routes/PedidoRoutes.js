const express = require("express");
const {
    getAllPedidos,
    getPedidosPendientes,
    createPedido,
    getPedidoById,
    getPedidoByCliente,
    updatePedido,
    deletePedido,
    getPedidosHoy,
    getPedidosAyer,
    getPedidosSemana,
    getPedidosSemanaAnterior,
    getPedidosMes
  } = require("../controllers/PedidoController");
const router = express.Router();

router.route("/getallpedidos").get(getAllPedidos);


router.route("/:id").get(getPedidoById).put(updatePedido).delete(deletePedido);
router.route("/").post(createPedido);




module.exports = router;
 