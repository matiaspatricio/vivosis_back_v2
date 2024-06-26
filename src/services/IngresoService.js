const IngresoModel = require("../models/ingreso");
const ProductoModel = require("../models/producto");

exports.getAllIngresos = async () => {
  return await IngresoModel.findAll({
    include: {
      model: ProductoModel,
      attributes: ['nombre']
    },
    order: [['fecha', 'DESC']]
  });
};
exports.getIngresoById = async (id) => {
  return await IngresoModel.findByPk(id, {
    include: {
      model: ProductoModel,
      attributes: ['nombre']
    }
  });
  };
  
  exports.updateIngreso = async (id, ingresoActualizado) => {
    try {
      // Buscar el ingreso por su ID
      const ingreso = await IngresoModel.findByPk(id);
  
      if (!ingreso) {
        throw new Error("Ingreso no encontrado");
      }
  
      // Actualizar los campos deseados del ingreso
      await ingreso.update(ingresoActualizado);
  
      // El ingreso actualizado se encuentra ahora en el objeto 'ingreso'
  
      return ingreso;
    } catch (error) {
      throw new Error("Error al actualizar el ingreso: " + error.message);
    }
  };  
  exports.deleteIngreso = async (id) => {
    return await IngresoModel.destroy({ where: { id } });
  };
  