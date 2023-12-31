const ClienteModel = require("../models/cliente");

exports.getAllClientes = async () => {
    return await ClienteModel.findAll();
  };

  exports.createCliente = async (cliente) => {
    return await ClienteModel.create(cliente);
  }
  exports.getClienteById = async (id) => {
    return await ClienteModel.findByPk(id);
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
  