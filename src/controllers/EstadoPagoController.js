const EstadoPagoService = require("../services/EstadoPagoService");
const EstadoPagoModel = require("../models/estadoPago")


exports.getAllEstadosPago = async (req, res) => {
    try {
      const estadosPago = await EstadoPagoService.getAllEstadosPago();    
      res.json(estadosPago);
    } catch (err) {
        res.status(500).json({ error: err.message });
      }
    };

exports.createEstadoPago = async (req, res) => {
  try {
    const estadoPago = await EstadoPagoService.createEstadoPago(req.body);
    res.json(estadoPago);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
exports.getEstadoPagoById = async (req, res) => {
  try {
    const estadoPago = await EstadoPagoService.getEstadoPagoById(req.params.id);
    res.json(estadoPago);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
exports.updateEstadoPago = async (req, res) => {
  try {
    const estadoPago = await EstadoPagoService.updateEstadoPago(req.params.id, req.body);
    res.json(estadoPago);
    
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteEstadoPago = async (req, res) => {
  try {
    const estadoPago = await EstadoPagoService.deleteEstadoPago(req.params.id);
    res.json(estadoPago);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

