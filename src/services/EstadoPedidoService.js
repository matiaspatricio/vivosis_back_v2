const EstadoPedidoModel = require("../models/estadoPedido");

exports.getAllEstadosPedido = async () => {
    return await EstadoPedidoModel.findAll({
      order: [['nombre', 'ASC']]
    });
  };
  exports.getEstadoPedidoById = async (id) => {
    return await EstadoPedidoModel.findByPk(id);
  };
  exports.createEstadoPedido = async (estadoPedido) => {
    return await EstadoPedidoModel.create(estadoPedido);
  };  
exports.updateEstadoPedido = async (id, estadoPedidoActualizado) => {
  try {
    // Buscar el estadoPedido por su ID
    const estadoPedido = await EstadoPedidoModel.findByPk(id);

    if (!estadoPedido) {
      throw new Error("EstadoPedido no encontrado");
    }

    // Actualizar los campos deseados del estadoPedido
    await estadoPedido.update(estadoPedidoActualizado);

    // El estadoPedido actualizado se encuentra ahora en el objeto 'estadoPedido'

    return estadoPedido;
  } catch (error) {
    throw new Error("Error al actualizar el estadoPedido: " + error.message);
    }
  };  
  exports.deleteEstadoPedido = async (id) => {
    return await EstadoPedidoModel.destroy({ where: { id } });
  };
  