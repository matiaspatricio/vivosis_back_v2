const SubsubcategoriaModel = require("../models/subcategoria");

exports.getAllSubsubcategorias = async () => {
    return await SubsubcategoriaModel.findAll();
  };
  exports.createSubsubcategoria = async (subcategoria) => {
    return await SubsubcategoriaModel.create(subcategoria);
  }
  exports.getSubsubcategoriaById = async (id) => {
    return await SubsubcategoriaModel.findByPk(id);
  };
  
  exports.updateSubsubcategoria = async (id, subcategoriaActualizado) => {
    try {
      // Buscar el subcategoria por su ID
      const subcategoria = await SubsubcategoriaModel.findByPk(id);
  
      if (!subcategoria) {
        throw new Error("Subsubcategoria no encontrado");
      }
  
      // Actualizar los campos deseados del subcategoria
      await subcategoria.update(subcategoriaActualizado);
  
      // El subcategoria actualizado se encuentra ahora en el objeto 'subcategoria'
  
      return subcategoria;
    } catch (error) {
      throw new Error("Error al actualizar el subcategoria: " + error.message);
    }
  };
  
  exports.deleteSubsubcategoria = async (id) => {
    return await SubsubcategoriaModel.destroy({ where: { id } });
  };
  