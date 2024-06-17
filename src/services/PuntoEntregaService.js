const PuntoEntregaModel = require("../models/puntoEntrega");

exports.getAllPuntosEntrega = async () => {
    return await PuntoEntregaModel.findAll({
      attributes: ["id", "nombre"],
      order: [["nombre", "ASC"]],
      
    });
  };

  exports.createPuntoEntrega = async (puntoEntrega) => {
    return await PuntoEntregaModel.create(puntoEntrega);
  }
  exports.getPuntoEntregaById = async (id) => {
    return await PuntoEntregaModel.findByPk(id);
  };
  
  exports.updatePuntoEntrega = async (id, puntoEntregaActualizado) => {
    try {
      // Buscar el puntoEntrega por su ID
      const puntoEntrega = await PuntoEntregaModel.findByPk(id);
  
      if (!puntoEntrega) {
        throw new Error("PuntoEntrega no encontrado");
      }
  
      // Actualizar los campos deseados del puntoEntrega
      await puntoEntrega.update(puntoEntregaActualizado);
  
      // El puntoEntrega actualizado se encuentra ahora en el objeto 'puntoEntrega'
  
      return puntoEntrega;
    } catch (error) {
      throw new Error("Error al actualizar el puntoEntrega: " + error.message);
    }
  };
  
  exports.deletePuntoEntrega = async (id) => {
    return await PuntoEntregaModel.destroy({ where: { id } });
  };
  