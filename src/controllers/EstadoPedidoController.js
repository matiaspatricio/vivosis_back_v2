const EstadoPedidoService = require("../services/EstadoPedidoService");
const EstadoPedidoModel = require("../models/estadoPedido")


exports.getAllEstadosPedido = async (req, res) => {
    try {
      const estadosPedido = await EstadoPedidoService.getAllEstadosPedido();    
      res.json(estadosPedido);
    } catch (err) {
        res.status(500).json({ error: err.message });
      }
    };

exports.createEstadoPedido = async (req, res) => {
  try {
    const estadoPedido = await EstadoPedidoService.createEstadoPedido(req.body);
    res.json(estadoPedido);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
exports.getEstadoPedidoById = async (req, res) => {
  try {
    const estadoPedido = await EstadoPedidoService.getEstadoPedidoById(req.params.id);
    res.json(estadoPedido);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
exports.updateEstadoPedido = async (req, res) => {
  try {
    const estadoPedido = await EstadoPedidoService.updateEstadoPedido(req.params.id, req.body);
    res.json(estadoPedido);
    
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteEstadoPedido = async (req, res) => {
  try {
    const estadoPedido = await EstadoPedidoService.deleteEstadoPedido(req.params.id);
    res.json(estadoPedido);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

