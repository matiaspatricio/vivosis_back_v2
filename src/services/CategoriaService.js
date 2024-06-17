const CategoriaModel = require("../models/categoria");

exports.getAllCategorias = async () => {
    return await CategoriaModel.findAll({
      order: [['nombre', 'ASC']]      
    });
  };
  exports.getCategoriaById = async (id) => {
    return await CategoriaModel.findByPk(id);
  };
  exports.createCategoria = async (categoria) => {
    return await CategoriaModel.create(categoria);
  }  
  exports.updateCategoria = async (id, categoriaActualizado) => {
    try {
      // Buscar el categoria por su ID
      const categoria = await CategoriaModel.findByPk(id);
  
      if (!categoria) {
        throw new Error("Categoria no encontrado");
      }
  
      // Actualizar los campos deseados del categoria
      await categoria.update(categoriaActualizado);
  
      // El categoria actualizado se encuentra ahora en el objeto 'categoria'
  
      return categoria;
    } catch (error) {
      throw new Error("Error al actualizar el categoria: " + error.message);
    }
  };
  
  exports.deleteCategoria = async (id) => {
    return await CategoriaModel.destroy({ where: { id } });
  };
  