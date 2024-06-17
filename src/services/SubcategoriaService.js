const SubcategoriaModel = require("../models/subcategoria");

exports.getAllSubcategorias = async () => {
    return await SubcategoriaModel.findAll();
  };
  exports.createSubcategoria = async (subcategoria) => {
    return await SubcategoriaModel.create(subcategoria);
  }
  exports.getSubcategoriaById = async (id) => {
    return await SubcategoriaModel.findByPk(id);
  };

  exports.getSubcategoriaByIdCategoria = async (id) => {
    return await SubcategoriaModel.findAll({
      where: {
        categoria_id: id

      },
      order: [['nombre', 'ASC']]
    });
  };
  
  exports.updateSubcategoria = async (id, subcategoriaActualizado) => {
    try {
      // Buscar el subcategoria por su ID
      const subcategoria = await SubcategoriaModel.findByPk(id);
  
      if (!subcategoria) {
        throw new Error("Subcategoria no encontrado");
      }
  
      // Actualizar los campos deseados del subcategoria
      await subcategoria.update(subcategoriaActualizado);
  
      // El subcategoria actualizado se encuentra ahora en el objeto 'subcategoria'
  
      return subcategoria;
    } catch (error) {
      throw new Error("Error al actualizar el subcategoria: " + error.message);
    }
  };
  
  exports.deleteSubcategoria = async (id) => {
    return await SubcategoriaModel.destroy({ where: { id } });
  };
  