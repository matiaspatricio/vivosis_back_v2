const express = require("express");
const {
    getAllPedidos,
    getPedidosPendientes,
    createPedido,
    getPedidoById,
    getPedidoByCliente,
    updatePedido,    
    getPedidosHoy,
    getPedidosAyer,
    getPedidosSemana,
    getPedidosSemanaAnterior,
    getPedidosMes,
    updatePedidoCabecera,
    updatePedidoDetalle,
    updatePedidoItem,    
    eliminadoLogicoItemPedido,
    eliminadoLogicoCabeceraPedido,
    getTotalesDashboard,
    getPedidosMesAnterior,
    getPedidoItemById
  } = require("../controllers/PedidoController");
const router = express.Router();

router.route("/getallpedidos").get(getAllPedidos);
router.route('/getpedidospendientes').get( getPedidosPendientes);
router.route('/getpedidobycliente/:id_cliente').get(getPedidoByCliente);

router.route('/cabecera/:id').put(updatePedidoCabecera).patch(eliminadoLogicoCabeceraPedido);
router.route('/detalle/:pedido_id/:id').get(getPedidoItemById).put(updatePedidoItem).patch(eliminadoLogicoItemPedido);
router.route('/detalle/:pedido_id').get(getPedidoById).put(updatePedidoDetalle);

router.route('/gettotalesdashboard').get(getTotalesDashboard);
router.route('/getpedidoshoy').get(getPedidosHoy);


//router.route("/:id").get(getPedidoById)

router.route("/").post(createPedido);




module.exports = router;
 