const PuntoEntregaService = require("../services/PuntoEntregaService");
const PuntoEntregaModel = require("../models/puntoEntrega")




exports.getAllPuntosEntrega = async (req, res) => {
    try {
      const puntosEntrega = await PuntoEntregaService.getAllPuntosEntrega();    
      res.json(puntosEntrega);
    } catch (err) {
        res.status(500).json({ error: err.message });
      }
    };

exports.createPuntoEntrega = async (req, res) => {
  try {
    const puntoEntrega = await PuntoEntregaService.createPuntoEntrega(req.body);
    res.json(puntoEntrega);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
exports.getPuntoEntregaById = async (req, res) => {
  try {
    const puntoEntrega = await PuntoEntregaService.getPuntoEntregaById(req.params.id);
    res.json(puntoEntrega);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
exports.updatePuntoEntrega = async (req, res) => {
  try {
    const puntoEntrega = await PuntoEntregaService.updatePuntoEntrega(req.params.id, req.body);
    res.json(puntoEntrega);
    
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deletePuntoEntrega = async (req, res) => {
  try {
    const puntoEntrega = await PuntoEntregaService.deletePuntoEntrega(req.params.id);
    res.json(puntoEntrega);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

