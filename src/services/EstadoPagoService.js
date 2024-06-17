const EstadoPagoModel = require("../models/estadoPago");

exports.getAllEstadosPago = async () => {
    return await EstadoPagoModel.findAll({
      order: [['nombre', 'ASC']]    
    });
  };
  exports.getEstadoPagoById = async (id) => {
    return await EstadoPagoModel.findByPk(id);
  };
  exports.createEstadoPago = async (estadoPago) => {
    return await EstadoPagoModel.create(estadoPago);
  };  
  exports.updateEstadoPago = async (id, estadoPagoActualizado) => {
    try {
      // Buscar el estadoPago por su ID
      const estadoPago = await EstadoPagoModel.findByPk(id);
  
      if (!estadoPago) {
        throw new Error("EstadoPago no encontrado");
      }
  
      // Actualizar los campos deseados del estadoPago
      await estadoPago.update(estadoPagoActualizado);
  
      // El estadoPago actualizado se encuentra ahora en el objeto 'estadoPago'
  
      return estadoPago;
    } catch (error) {
      throw new Error("Error al actualizar el estadoPago: " + error.message);
    }
  };  
  exports.deleteEstadoPago = async (id) => {
    return await EstadoPagoModel.destroy({ where: { id } });
  };
  