const PedidoCabeceraModel = require("../models/pedido_cabecera");
const PedidoDetalleModel = require("../models/pedido_detalle");
const { zonedTimeToUtc, utcToZonedTime } = require('date-fns-tz');
const { startOfDay, endOfDay, subDays, startOfWeek, endOfWeek, startOfToday } = require('date-fns');
const timeZone = 'America/Argentina/Buenos_Aires';
const { Op } = require('sequelize');
const ClienteModel = require("../models/cliente");

exports.getPedidosPendientes = async () => { //version nueva
  try {
      const pedidosPendientes = await PedidoCabeceraModel.findAll({
          where: {
              estado_pedido: {
                  [Op.notIn]: [3, 4]
              }
          },
          include: [{
              model: PedidoDetalleModel,
              as: 'Pedidos_detalles'
          },
          {
            model: ClienteModel,
            attributes: ['id', 'nombre']
          }
        ],
          order: [['id', 'DESC']]
      });
      return pedidosPendientes;
  } catch (error) {
      console.error('Error al obtener los pedidos pendientes:', error);
      throw error;
  }
};
exports.getAllPedidos = async () => {
  try {
    const pedidos = await PedidoCabeceraModel.findAll({
      include: [
        {
          model: PedidoDetalleModel,
          as: 'Pedidos_detalles'
        },
        {
          model: ClienteModel,
          attributes: ['id', 'nombre']
        }
        
      ],
      order: [['id', 'DESC']]
    });
    return pedidos;
  } catch (error) {
    console.error('Error al obtener todos los pedidos:', error);
    throw error;
  }
};

exports.getPedidosHoy = async () => {
  try {
    const today = utcToZonedTime(new Date(), timeZone);
    const startOfTodayDate = zonedTimeToUtc(startOfDay(today), timeZone);
    const endOfToday = zonedTimeToUtc(endOfDay(today), timeZone);

    console.log(startOfTodayDate)
    console.log(endOfToday)
    const pedidosHoy = await PedidoCabeceraModel.findAll({
      where: {
        fecha: {
          [Op.between]: [startOfTodayDate, endOfToday]
        }
      },
      include: [
        {
          model: PedidoDetalleModel,
          as: 'Pedidos_detalles'
        },
        {
          model: ClienteModel,
          attributes: ['id', 'nombre']
        }
      ],
      order: [['id', 'DESC']]
    },
    
  );

      return pedidosHoy;
    } catch (error) {
      console.error('Error al obtener los pedidos de hoy:', error);
      throw error;
    }
  };

  exports.getPedidosAyer = async () => {
    try {
      const yesterday = utcToZonedTime(subDays(new Date(), 1), timeZone);
      const startOfYesterday = zonedTimeToUtc(startOfDay(yesterday), timeZone);
      const endOfYesterday = zonedTimeToUtc(endOfDay(yesterday), timeZone);

      const pedidosAyer = await PedidoCabeceraModel.findAll({
        where: {
          fecha: {
            [Op.between]: [startOfYesterday, endOfYesterday]
          }
        },
        include: [
          {
            model: PedidoDetalleModel,
            as: 'Pedidos_detalles'
          },
          {
            model: ClienteModel,
            attributes: ['id', 'nombre']
          }
        ],
        order: [['id', 'DESC']]
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

      const pedidosSemana = await PedidoCabeceraModel.findAll({
        where: {
          fecha: {
            [Op.between]: [startOfThisWeek, endOfThisWeek]
          }
        },
        include: [
          {
            model: PedidoDetalleModel,
            as: 'Pedidos_detalles'
          },
          {
            model: ClienteModel,
            attributes: ['id', 'nombre']
          }
        ],
        order: [['id', 'DESC']]
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

      const pedidosSemanaAnterior = await PedidoCabeceraModel.findAll({
        where: {
          fecha: {
            [Op.between]: [startOfLastWeek, endOfLastWeekWithTime]
          }
        },
        include: [
          {
            model: PedidoDetalleModel,
            as: 'Pedidos_detalles'
          },
          {
            model: ClienteModel,
            attributes: ['id', 'nombre']
          }
        ],
        order: [['id', 'DESC']]
      });

      return pedidosSemanaAnterior;
    } catch (error) {
      console.error('Error al obtener los pedidos de la semana anterior:', error);
      throw error;
    }
  };

  exports.getPedidosMes = async (startOfMonth, endOfMonth) => {
    try {
      const pedidosMes = await PedidoCabeceraModel.findAll({
        where: {
          fecha: {
            [Op.between]: [startOfMonth, endOfMonth]
          }
        },
        include: [
          {
            model: PedidoDetalleModel,
            as: 'Pedidos_detalles'
          },
          {
            model: ClienteModel,
            attributes: ['id', 'nombre']
          }
        ],
        order: [['id', 'DESC']]
      });

      return pedidosMes;
    } catch (error) {
      console.error('Error al obtener los pedidos del mes:', error);
      throw error;
    }
  };

  exports.createPedido = async (pedido) => {
    try {
      const { detalles, ...pedidoData } = pedido;
  
      const pedidoCreado = await PedidoCabeceraModel.create({
        ...pedidoData,
        Pedidos_detalles: detalles.map(detalle => ({
          ...detalle
        }))
      }, {
        include: [{
          model: PedidoDetalleModel,
          as: 'Pedidos_detalles'
        }]
      });
  
      return pedidoCreado;
    } catch (error) {
      console.error('Error al crear el pedido:', error);
      throw error;
    }
  };

  exports.getPedidoById = async (id) => {
    try {
      const pedidoCabecera = await PedidoCabeceraModel.findByPk(id, {
        include: [
          {
            model: PedidoDetalleModel,
            as: 'Pedidos_detalles'
          },
          {
            model: ClienteModel,
            attributes: ['id', 'nombre']
          }
        ]
      });

      return pedidoCabecera;
    } catch (error) {
      console.error('Error al obtener el pedido por ID:', error);
      throw error;
    }
  };

  exports.updatePedido = async (id, pedidoActualizado) => {
    try {
      // Buscar el pedido por su ID
      const pedidoCabecera = await PedidoCabeceraModel.findByPk(id);

      if (!pedidoCabecera) {
        throw new Error("Pedido no encontrado");
      }

      // Actualizar los campos deseados del pedido
      await pedidoCabecera.update(pedidoActualizado);

      // Actualizar los detalles del pedido
      await PedidoDetalleModel.destroy({ where: { pedido_cabecera_id: pedidoCabecera.id } });
      await PedidoDetalleModel.bulkCreate(pedidoActualizado.detalles.map(detalle => ({
        ...detalle,
        pedido_cabecera_id: pedidoCabecera.id
      })));

      // El pedido actualizado se encuentra ahora en el objeto 'pedidoCabecera'

      return pedidoCabecera;
    } catch (error) {
      console.error('Error al actualizar el pedido:', error);
      throw error;
    }
  };

  exports.deletePedido = async (id) => {
    try {
      // Eliminar los detalles del pedido
      await PedidoDetalleModel.destroy({ where: { pedido_cabecera_id: id } });

      // Eliminar la cabecera del pedido
      const deletedRows = await PedidoCabeceraModel.destroy({ where: { id } });

      return deletedRows;
    } catch (error) {
      console.error('Error al eliminar el pedido:', error);
      throw error;
    }
  };