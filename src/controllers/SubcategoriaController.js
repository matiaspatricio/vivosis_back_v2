const SubcategoriaService = require("../services/SubcategoriaService");
const SubcategoriaModel = require("../models/subcategoria")


exports.getAllSubcategorias = async (req, res) => {
    try {
      const subcategorias = await SubcategoriaService.getAllSubcategorias();    
      res.json(subcategorias);
    } catch (err) {
        res.status(500).json({ error: err.message });
      }
    };

exports.createSubcategoria = async (req, res) => {
  try {
    const subcategoria = await SubcategoriaService.createSubcategoria(req.body);
    res.json(subcategoria);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
exports.getSubcategoriaById = async (req, res) => {
  try {
    const subcategoria = await SubcategoriaService.getSubcategoriaById(req.params.id);
    res.json(subcategoria);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getSubcategoriaByIdCategoria = async (req, res) => {
  try {
    const subcategoria = await SubcategoriaService.getSubcategoriaByIdCategoria(req.params.id);
    res.json(subcategoria);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateSubcategoria = async (req, res) => {
  try {
    const subcategoria = await SubcategoriaService.updateSubcategoria(req.params.id, req.body);
    res.json(subcategoria);
    
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteSubcategoria = async (req, res) => {
  try {
    const subcategoria = await SubcategoriaService.deleteSubcategoria(req.params.id);
    res.json(subcategoria);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

