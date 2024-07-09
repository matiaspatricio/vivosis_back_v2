const PedidoService = require("../services/PedidoService");
//const PedidoModel = require("../models/pedido")
exports.getPedidosHoy = async (req, res) => {
  try {
    const pedidos = await PedidoService.getPedidosHoy();
    res.json(pedidos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getTotalesDashboard = async (req, res) => {
  try {
    console.log("ingresando al controlador de totales")
    // Llamadas asincrónicas a cada método para obtener los totales
    const pedidosHoy = await PedidoService.getPedidosHoy();
    console.log("pedidosHoy", pedidosHoy)
    const pedidosAyer = await PedidoService.getPedidosAyer();
    console.log("pedidosAyer", pedidosAyer)
    const pedidosSemana = await PedidoService.getPedidosSemana();    
    console.log("pedidosSemana", pedidosSemana)
    const pedidosSemanaAnterior = await PedidoService.getPedidosSemanaAnterior();
    console.log("pedidosSemanaAnterior", pedidosSemanaAnterior)
    const pedidosMes = await PedidoService.getPedidosMes();
    console.log("pedidosMes", pedidosMes)        
    const pedidosMesAnterior = await PedidoService.getPedidosMesAnterior();
    console.log("pedidosMesAnterior", pedidosMesAnterior)

    // Construcción del objeto de respuesta
    const totalesDashboard = {
      pedidosHoy: pedidosHoy, // Asegúrate de que estos métodos devuelvan un objeto con una propiedad 'total'
      pedidosAyer: pedidosAyer,
      pedidosSemana: pedidosSemana,
      pedidosSemanaAnterior: pedidosSemanaAnterior,
      pedidosMes: pedidosMes,
      pedidosMesAnterior: pedidosMesAnterior,
    };
    console.log("Totales para el dashboard:", totalesDashboard);

    // Envío del objeto de respuesta
    res.json(totalesDashboard);
  } catch (error) {
    console.log("Error al obtener los totales para el dashboard:", error);
    res
      .status(500)
      .json({
        error: "Ocurrió un error al obtener los totales para el dashboard",
      });
  }
};

exports.getAllPedidos = async (req, res) => {
  try {
    const pedidos = await PedidoService.getAllPedidos();
    res.json(pedidos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getPedidosPendientes = async (req, res) => {
  try {
    const pedidos = await PedidoService.getPedidosPendientes();
    res.json(pedidos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createPedido = async (req, res) => {
  try {
    const pedido = await PedidoService.createPedido(req.body);
    res.json(pedido);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getPedidoById = async (req, res) => {
  try {
    const pedido = await PedidoService.getPedidoById(req.params.pedido_id);
    res.json(pedido);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getPedidoItemById = async (req, res) => {
  try {
    const pedido = await PedidoService.getPedidoItemById(
      req.params.pedido_id,
      req.params.id
    );
    res.json(pedido);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getPedidoByCliente = async (req, res) => {
  try {
    const pedido = await PedidoService.getPedidoByCliente(
      req.params.id_cliente
    );
    res.json(pedido);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updatePedidoCabecera = async (req, res) => {
  try {
    const pedido = await PedidoService.updatePedidoCabecera(
      req.params.id,
      req.body
    );
    res.json(pedido);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updatePedidoDetalle = async (req, res) => {
  try {
    const pedido = await PedidoService.updatePedidoDetalle(req.body);
    res.json(pedido);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
exports.updatePedidoItem = async (req, res) => {
  try {
    const pedido = await PedidoService.updatePedidoItem(
      req.params.pedido_id,
      req.params.id,
      req.body
    );
    res.json(pedido);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.eliminadoLogicoItemPedido = async (req, res) => {
  try {
    const pedido = await PedidoService.eliminadoLogicoItemPedido(
      req.body.pedido_id,
      req.body.id
    );
    res.json(pedido);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
exports.eliminadoLogicoCabeceraPedido = async (req, res) => {
  try {
    const pedido = await PedidoService.eliminadoLogicoCabeceraPedido(
      req.params.id
    );
    res.json(pedido);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
