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
    getPedidosMes,
    updatePedidoCabecera,
    updatePedidoDetalle,
    deleteItemPedido,
    eliminadoLogicoItemPedido,
    getPedidoItemById
  } = require("../controllers/PedidoController");
const router = express.Router();

router.route("/getallpedidos").get(getAllPedidos);
router.route('/getpedidospendientes').get( getPedidosPendientes);
router.route('/getpedidobycliente/:id_cliente').get(getPedidoByCliente);
router.route('/getpedidosayer').get(getPedidosAyer);
router.route('/getpedidossemana').get(getPedidosSemana);
router.route('/getpedidossemanaanterior').get(getPedidosSemanaAnterior);
router.route('/getpedidosmes').get(getPedidosMes);
router.route('/getpedidoshoy').get(getPedidosHoy);

router.route('/cabecera/:id').put(updatePedidoCabecera);
router.route('/detalle/:pedido_id/:id').get(getPedidoItemById).put(updatePedidoDetalle).delete(deleteItemPedido).patch(eliminadoLogicoItemPedido);




router.route("/:id").get(getPedidoById).put(updatePedido).delete(deletePedido);

router.route("/").post(createPedido);




module.exports = router;
 