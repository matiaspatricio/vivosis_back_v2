const ClienteModel = require("../models/cliente");

exports.getAllClientes = async () => {
  return await ClienteModel.findAll({
    include: [
      {
        model: ClienteModel,
        as: 'Referido',
        attributes: ['nombre'], // Asegúrate de cambiar 'nombre' por el campo que contiene la descripción del referido
      }
    ],
    order: [['nombre', 'ASC']]
  });
};
exports.getClienteById = async (id) => {
  return await ClienteModel.findByPk(id, {
    include: [
      {
        model: ClienteModel,
        as: 'Referido',
        attributes: ['id', 'nombre'], // Incluye 'id' y 'nombre' en los atributos a devolver
      }
    ]
  });
};

exports.createCliente = async (cliente) => {
  return await ClienteModel.create(cliente);
};  
exports.updateCliente = async (id, clienteActualizado) => {
  try {
    // Buscar el cliente por su ID
    const cliente = await ClienteModel.findByPk(id);

    if (!cliente) {
      throw new Error("Cliente no encontrado");
    }

    // Actualizar los campos deseados del cliente
    await cliente.update(clienteActualizado);

    // El cliente actualizado se encuentra ahora en el objeto 'cliente'

    return cliente;
  } catch (error) {
    throw new Error("Error al actualizar el cliente: " + error.message);
  }
  };  
  exports.deleteCliente = async (id) => {
    return await ClienteModel.destroy({ where: { id } });
  };
  