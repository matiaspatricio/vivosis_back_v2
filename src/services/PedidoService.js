const PedidoModel = require("../models/pedido");
const { zonedTimeToUtc, utcToZonedTime } = require('date-fns-tz');
const { startOfDay, endOfDay, subDays, startOfWeek, endOfWeek, startOfToday } = require('date-fns');
const timeZone = 'America/Argentina/Buenos_Aires';


exports.getAllPedidos = async () => {
    return await PedidoModel.findAll();
  };

  exports.getPedidosPendientes = async () => {
    try {
      const pedidosPendientes = await Pedido.findAll({
        where: {
          estado_pedido: {
            [Sequelize.Op.notIn]: [3, 4]
          }
        },
        order: [['id', 'DESC']] 
      });
      return pedidosPendientes;
    } catch (error) {
      console.error('Error al obtener los pedidos pendientes:', error);
      throw error;
    }
  };

  exports.getPedidosHoy = async () => {
    try {
      const today = utcToZonedTime(new Date(), timeZone);
      const startOfTodayDate = zonedTimeToUtc(startOfDay(today), timeZone);
      const endOfToday = zonedTimeToUtc(endOfDay(today), timeZone);
  
      const pedidosHoy = await Pedido.findAll({
        where: {
          fecha: {
            [Op.between]: [startOfTodayDate, endOfToday]
          }
        }
      });
  
      return pedidosHoy;
    } catch (error) {
      console.error('Error al obtener los pedidos de hoy:', error);
      throw error;
    }
  }; //asd

  exports.getPedidosAyer = async () => {
    try {
      const yesterday = utcToZonedTime(subDays(new Date(), 1), timeZone);
      const startOfYesterday = zonedTimeToUtc(startOfDay(yesterday), timeZone);
      const endOfYesterday = zonedTimeToUtc(endOfDay(yesterday), timeZone);
  
      const pedidosAyer = await Pedido.findAll({
        where: {
          fecha: {
            [Op.between]: [startOfYesterday, endOfYesterday]
          }
        }
      });
  
      return pedidosAyer;
    } catch (error) {
      console.error('Error al obtener los pedidos de ayer:', error);
      throw error;
    }
  };

  exports.getPedidosSemana = async () => {
    try {
      const today = zonedTimeToUtc(startOfToday(), timeZone);
      const startOfThisWeek = startOfWeek(today, { weekStartsOn: 1 }); // 1 represents Monday as the start of the week
      const endOfThisWeek = endOfWeek(today, { weekStartsOn: 1 });
  
      const pedidosSemana = await Pedido.findAll({
        where: {
          fecha: {
            [Op.between]: [startOfThisWeek, endOfThisWeek]
          }
        }
      });
  
      return pedidosSemana;
    } catch (error) {
      console.error('Error al obtener los pedidos de la semana:', error);
      throw error;
    }
  };

  exports.getPedidosSemanaAnterior = async () => {
    try {
      const today = zonedTimeToUtc(startOfToday(), timeZone);
      const startOfLastWeek = startOfWeek(subDays(today, 7), { weekStartsOn: 1 }); // Substract 7 days to get the start of the previous week
      const endOfLastWeek = endOfWeek(subDays(today, 7), { weekStartsOn: 1 });
  
      // Ajustar las fechas para que sean la última hora del día
      const endOfLastWeekWithTime = new Date(endOfLastWeek.getTime() + 86399999);
  
      const pedidosSemanaAnterior = await Pedido.findAll({
        where: {
          fecha: {
            [Op.between]: [startOfLastWeek, endOfLastWeekWithTime]
          }
        }
      });
  
      return pedidosSemanaAnterior;
    } catch (error) {
      console.error('Error al obtener los pedidos de la semana anterior:', error);
      throw error;
    }
  };

  exports.getPedidosMes = async (startOfMonth, endOfMonth) => {
    try {
      const pedidosMes = await Pedido.findAll({
        where: {
          fecha: {
            [Op.between]: [startOfMonth, endOfMonth]
          }
        }
      });
  
      return pedidosMes;
    } catch (error) {
      console.error('Error al obtener los pedidos del mes:', error);
      throw error;
    }
  };

  exports.createPedido = async (pedido) => {
    return await PedidoModel.create(pedido);
  }
  exports.getPedidoById = async (id) => {
    return await PedidoModel.findByPk(id);
  };
  
  exports.updatePedido = async (id, pedidoActualizado) => {
    try {
      // Buscar el pedido por su ID
      const pedido = await PedidoModel.findByPk(id);
  
      if (!pedido) {
        throw new Error("Pedido no encontrado");
      }
  
      // Actualizar los campos deseados del pedido
      await pedido.update(pedidoActualizado);
  
      // El pedido actualizado se encuentra ahora en el objeto 'pedido'
  
      return pedido;
    } catch (error) {
      throw new Error("Error al actualizar el pedido: " + error.message);
    }
  };
  
  exports.deletePedido = async (id) => {
    return await PedidoModel.destroy({ where: { id } }); 
  };  