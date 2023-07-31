const DireccionModel = require("../models/direccion");

exports.getAllDirecciones = async () => {
    return await DireccionModel.findAll();
  };

  exports.createDireccion = async (direccion) => {
    return await DireccionModel.create(direccion);
  }
  exports.getDireccionById = async (id) => {
    return await DireccionModel.findByPk(id);
  };
  
  exports.updateDireccion = async (id, direccionActualizado) => {
    try {
      // Buscar el direccion por su ID
      const direccion = await DireccionModel.findByPk(id);
  
      if (!direccion) {
        throw new Error("Direccion no encontrado");
      }
  
      // Actualizar los campos deseados del direccion
      await direccion.update(direccionActualizado);
  
      // El direccion actualizado se encuentra ahora en el objeto 'direccion'
  
      return direccion;
    } catch (error) {
      throw new Error("Error al actualizar el direccion: " + error.message);
    }
  };
  
  exports.deleteDireccion = async (id) => {
    return await DireccionModel.destroy({ where: { id } });
  };
  