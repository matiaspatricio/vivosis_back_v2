const PedidoService = require("../services/PedidoService");
const PedidoModel = require("../models/pedido")


exports.getAllPedidos = async (req, res) => {
    try {
      const pedidos = await PedidoService.getAllPedidos();    
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
}
exports.getPedidoById = async (req, res) => {
  try {
    const pedido = await PedidoService.getPedidoById(req.params.id);
    res.json(pedido);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
exports.updatePedido = async (req, res) => {
  try {
    const pedido = await PedidoService.updatePedido(req.params.id, req.body);
    res.json(pedido);
    
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deletePedido = async (req, res) => {
  try {
    const pedido = await PedidoService.deletePedido(req.params.id);
    res.json(pedido);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

