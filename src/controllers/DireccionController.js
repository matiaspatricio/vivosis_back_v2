const DireccionService = require("../services/DireccionService");
const DireccionModel = require("../models/direccion")


exports.getAllDirecciones = async (req, res) => {
    try {
      const direcciones = await DireccionService.getAllDirecciones();    
      res.json(direcciones);
    } catch (err) {
        res.status(500).json({ error: err.message });
      }
    };

exports.createDireccion = async (req, res) => {
  try {
    const direccion = await DireccionService.createDireccion(req.body);
    res.json(direccion);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
exports.getDireccionById = async (req, res) => {
  try {
    const direccion = await DireccionService.getDireccionById(req.params.id);
    res.json(direccion);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
exports.updateDireccion = async (req, res) => {
  try {
    const direccion = await DireccionService.updateDireccion(req.params.id, req.body);
    res.json(direccion);
    
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteDireccion = async (req, res) => {
  try {
    const direccion = await DireccionService.deleteDireccion(req.params.id);
    res.json(direccion);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

