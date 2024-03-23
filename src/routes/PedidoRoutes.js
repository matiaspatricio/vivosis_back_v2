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
router.route("/getpedidospendientes").get(getPedidosPendientes);

// Rutas corregidas:
router.route("/getpedidosayer").get(() => {
  getPedidosAyer().then((pedidos) => {
    // Envia la respuesta con los pedidos
    res.status(200).json(pedidos);
  }).catch((error) => {
    // Maneja el error y envía una respuesta adecuada
    res.status(500).json({ error: "Error al obtener pedidos de ayer" });
  });
});

router.route("/getpedidossemana").get(() => {
  getPedidosSemana().then((pedidos) => {
    res.status(200).json(pedidos);
  }).catch((error) => {
    res.status(500).json({ error: "Error al obtener pedidos de la semana" });
  });
});

router.route("/getpedidossemanaanterior").get(() => {
  getPedidosSemanaAnterior().then((pedidos) => {
    res.status(200).json(pedidos);
  }).catch((error) => {
    res.status(500).json({ error: "Error al obtener pedidos de la semana anterior" });
  });
});

router.route("/getpedidosmes").get(() => {
  getPedidosMes().then((pedidos) => {
    res.status(200).json(pedidos);
  }).catch((error) => {
    res.status(500).json({ error: "Error al obtener pedidos del mes" });
  });
});

router.route("/getpedidoshoy").get(() => {
  getPedidosHoy().then((pedidos) => {
    res.status(200).json(pedidos);
  }).catch((error) => {
    res.status(500).json({ error: "Error al obtener pedidos de hoy" });
  });
});

router.route("/getpedidobycliente/:id_cliente").get(getPedidoByCliente);

router.route("/:id").get(getPedidoById).put(updatePedido).delete(deletePedido);
router.route("/").post(createPedido);

module.exports = router;
