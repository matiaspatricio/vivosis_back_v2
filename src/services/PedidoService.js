const PedidoCabeceraModel = require("../models/pedido_cabecera");
const PedidoDetalleModel = require("../models/pedido_detalle");
const { zonedTimeToUtc, utcToZonedTime } = require("date-fns-tz");
const {
  startOfDay,
  endOfDay,
  subDays,
  startOfWeek,
  endOfWeek,
  startOfToday,
  subMonths,
  startOfMonth,
  endOfMonth,
} = require("date-fns");
const timeZone = "America/Argentina/Buenos_Aires";
const { Op, where } = require("sequelize");
const ClienteModel = require("../models/cliente");
const ProductoModel = require("../models/producto");
const ProductoService = require("./ProductoService");
const { Sequelize } = require("sequelize");

exports.getPedidoById = async (id) => {
  try {
    const pedidoCabecera = await PedidoCabeceraModel.findByPk(id, {
      include: [
        {
          model: ClienteModel,
          as: "Cliente",
          attributes: ["id", "nombre"],
        },
        {
          model: PedidoDetalleModel,
          as: "Pedidos_detalles",
          where: {
            estado_item: {
              [Op.notIn]: [3, 4, 6], // Excluye los estados 3, 4 y 6
            },
          },
          include: [
            {
              model: ProductoModel, // Incluye el modelo de Producto
              as: "Producto", // Alias para el modelo de Producto
              attributes: ["id", "nombre"], // Especifica que quieres devolver el campo 'nombre'
            },
          ],
        },
      ],
      where: {
        estado_pedido: {
          [Op.notIn]: [3, 4, 6], // Excluye los estados 3, 4 y 6
        },
      },
    });

    return pedidoCabecera;
  } catch (error) {
    console.error("Error al obtener el pedido por ID:", error);
    throw error;
  }
};
exports.getPedidoItemById = async (pedido_id, item_id) => {
  try {
    // Buscar el detalle del pedido por pedido_id y item_id
    const pedidoDetalle = await PedidoDetalleModel.findOne({
      where: {
        id: item_id,
        pedido_id: pedido_id,
        estado_item: {
          [Op.notIn]: [3, 4, 6], // Excluye los estados 3, 4 y 6
        },
      },

      include: [
        {
          model: ProductoModel,
          as: "Producto",
          attributes: ["id", "nombre"],
        },
      ],
    });

    if (!pedidoDetalle) {
      throw new Error("Item no encontrado");
    }

    return pedidoDetalle;
  } catch (error) {
    console.error("Error al obtener el item del pedido por ID:", error);
    throw error;
  }
};

exports.getPedidosPendientes = async () => {
  try {
    const pedidosPendientes = await PedidoCabeceraModel.findAll({
      where: {
        estado_pedido: {
          [Op.notIn]: [3, 4, 6],
        },
      },
      include: [
        {
          model: ClienteModel,
          as: "Cliente",
          attributes: ["id", "nombre"],
        },
        {
          model: PedidoDetalleModel,
          as: "Pedidos_detalles",
          include: [
            {
              model: ProductoModel, // Incluye el modelo de Producto
              as: "Producto", // Alias para el modelo de Producto
              attributes: ["id", "nombre"], // Especifica que quieres devolver el campo 'nombre'
            },
          ],
        },
      ],
    });
    return pedidosPendientes;
  } catch (error) {
    console.error(error);
  }
};
exports.getAllPedidos = async () => {
  try {
    const pedidos = await PedidoCabeceraModel.findAll({
      include: [
        {
          model: ClienteModel,
          as: "Cliente",
          attributes: ["id", "nombre"],
        },
        {
          model: PedidoDetalleModel,
          as: "Pedidos_detalles",
          include: [
            {
              model: ProductoModel, // Incluye el modelo de Producto
              as: "Producto", // Alias para el modelo de Producto
              attributes: ["id", "nombre"], // Especifica que quieres devolver el campo 'nombre'
            },
          ],
        },
      ],
      order: [["id", "DESC"]],
    });
    return pedidos;
  } catch (error) {
    console.error("Error al obtener todos los pedidos:", error);
    throw error;
  }
};

exports.getPedidosHoy = async () => {
  const timeZone = "America/Argentina/Buenos_Aires";
  const today = utcToZonedTime(new Date(), timeZone);
  const startOfToday = startOfDay(today);
  const endOfToday = endOfDay(today);

  try {
    const resultado = await PedidoDetalleModel.findAll({
      attributes: [
        [Sequelize.fn("SUM", Sequelize.col("total")), "totalSum"],
        [Sequelize.fn("COUNT", Sequelize.col("id")), "totalItems"] // Asumiendo que 'id' es una columna que quieres contar
      ],
      where: { fecha: { [Op.between]: [startOfToday, endOfToday] } },
      raw: true,
    });
    return resultado;
  } catch (error) {
    console.error(
      "Error al obtener la suma del total y el conteo de los pedidos de hoy:",
      error
    );
    throw error;
  }
};
exports.getPedidosAyer = async () => {
  const timeZone = "America/Argentina/Buenos_Aires";
  const yesterday = utcToZonedTime(subDays(new Date(), 1), timeZone);
  const startOfYesterday = startOfDay(yesterday);
  const endOfYesterday = endOfDay(yesterday);

  try {
    const resultado = await PedidoDetalleModel.findAll({
      attributes: [
        [Sequelize.fn("SUM", Sequelize.col("total")), "totalSum"],
        [Sequelize.fn("COUNT", Sequelize.col("id")), "totalItems"] // Asumiendo que 'id' es una columna que quieres contar
      ],
      where: { fecha: { [Op.between]: [startOfYesterday, endOfYesterday] } },
      raw: true,
    });
    return resultado;
  } catch (error) {
    console.error(
      "Error al obtener la suma del total y el conteo de los pedidos de ayer:",
      error
    );
    throw error;
  }
};
exports.getPedidosSemana = async () => {
  const timeZone = "America/Argentina/Buenos_Aires"; // Asegúrate de definir la zona horaria correctamente
  const today = zonedTimeToUtc(startOfToday(), timeZone);
  const startOfThisWeek = startOfWeek(today, { weekStartsOn: 1 }); // Asumiendo que la semana comienza el lunes
  const endOfThisWeek = endOfDay(today);
  
  try {
    const resultado = await PedidoDetalleModel.findAll({
      attributes: [
        [Sequelize.fn("SUM", Sequelize.col("total")), "totalSum"],
        [Sequelize.fn("COUNT", Sequelize.col("id")), "totalItems"] // Asumiendo que 'id' es una columna que quieres contar
      ],
      where: { fecha: { [Op.between]: [startOfThisWeek, endOfThisWeek] } },
      raw: true,
    });
    return resultado;
  } catch (error) {
    console.error(
      "Error al obtener la suma del total y el conteo de los pedidos de la semana:",
      error
    );
    throw error;
  }
};
exports.getPedidosSemanaAnterior = async () => {
  const timeZone = "America/Argentina/Buenos_Aires"; // Asegúrate de definir la zona horaria correctamente
  const today = zonedTimeToUtc(startOfToday(), timeZone);
  const startOfLastWeek = startOfWeek(subDays(today, 7), { weekStartsOn: 1 }); // Asumiendo que la semana comienza el lunes
  const endOfLastWeek = endOfDay(subDays(today, 7));

  try {
    const resultado = await PedidoDetalleModel.findAll({
      attributes: [
        [Sequelize.fn("SUM", Sequelize.col("total")), "totalSum"],
        [Sequelize.fn("COUNT", Sequelize.col("id")), "totalItems"] // Asumiendo que 'id' es una columna que quieres contar
      ],
      where: { fecha: { [Op.between]: [startOfLastWeek, endOfLastWeek] } },
      raw: true,
    });
    return resultado;
  } catch (error) {
    console.error(
      "Error al obtener la suma del total y el conteo de los pedidos de la semana anterior:",
      error
    );
    throw error;
  }
};


exports.getPedidosMes = async () => {
  const timeZone = "America/Argentina/Buenos_Aires"; // Asegúrate de definir la zona horaria correctamente
  const today = zonedTimeToUtc(startOfToday(), timeZone);
  const startOfThisMonth = startOfMonth(today);
  const endOfThisMonth = endOfDay(today);

  try {
    const resultado = await PedidoDetalleModel.findAll({
      attributes: [
        [Sequelize.fn("SUM", Sequelize.col("total")), "totalSum"],
        [Sequelize.fn("COUNT", Sequelize.col("id")), "totalItems"] // Asumiendo que 'id' es una columna que quieres contar
      ],
      where: { fecha: { [Op.between]: [startOfThisMonth, endOfThisMonth] } },
      raw: true,
    });
    return resultado;
  } catch (error) {
    console.error(
      "Error al obtener la suma del total y el conteo de los pedidos del mes:",
      error
    );
    throw error;
  }
};

exports.getPedidosMesAnterior = async () => {
  const timeZone = "America/Argentina/Buenos_Aires"; // Asegúrate de definir la zona horaria correctamente
  const today = zonedTimeToUtc(startOfToday(), timeZone);
  const startOfLastMonth = startOfMonth(subMonths(today, 1));
  const endOfLastMonth = endOfDay(subMonths(today, 1));

  try {
    const resultado = await PedidoDetalleModel.findAll({
      attributes: [
        [Sequelize.fn("SUM", Sequelize.col("total")), "totalSum"],
        [Sequelize.fn("COUNT", Sequelize.col("id")), "totalItems"] // Asumiendo que 'id' es una columna que quieres contar
      ],
      where: { fecha: { [Op.between]: [startOfLastMonth, endOfLastMonth] } },
      raw: true,
    });
    return resultado;
  } catch (error) {
    console.error(
      "Error al obtener la suma del total y el conteo de los pedidos del mes anterior:",
      error
    );
    throw error;
  }
};

exports.createPedido = async (pedido) => {
  try {
    const { Pedidos_detalles, ...pedidoData } = pedido;

    const pedidoCreado = await PedidoCabeceraModel.create(
      {
        ...pedidoData,
        Pedidos_detalles: Pedidos_detalles.map((detalle) => ({
          ...detalle,
        })),
      },
      {
        include: [
          {
            model: PedidoDetalleModel,
            as: "Pedidos_detalles",
          },
        ],
      }
    );

    return pedidoCreado;
  } catch (error) {
    console.error("Error al crear el pedido:", error);
    throw error;
  }
};

exports.updatePedidoCabecera = async (id, pedidoCabeceraActualizado) => {
  try {
    const pedidoCabecera = await PedidoCabeceraModel.findByPk(id);
    if (!pedidoCabecera) {
      throw new Error("Pedido no encontrado");
    }
    await pedidoCabecera.update(pedidoCabeceraActualizado);
    return pedidoCabecera;
  } catch (error) {
    console.error("Error al actualizar la cabecera del pedido:", error);
    throw error;
  }
};

exports.updatePedidoDetalle = async (pedidoDetalleActualizado) => {
  try {
    console.log("pedidoDetalleActualizado", pedidoDetalleActualizado);
    console.log("Detalle", pedidoDetalleActualizado.Pedidos_detalles);
    const pedidoCabecera = await PedidoCabeceraModel.findByPk(
      pedidoDetalleActualizado.id
    );
    if (!pedidoCabecera) {
      throw new Error("Pedido no encontrado");
    }
    if (pedidoDetalleActualizado) {
      for (let detalle of pedidoDetalleActualizado.Pedidos_detalles) {
        console.log("check");
        const existingDetalle = await PedidoDetalleModel.findOne({
          where: { id: detalle.id },
        });
        console.log("existingDetalle", existingDetalle);

        if (existingDetalle) {
          await existingDetalle.update(existingDetalle);
        } else {
          await PedidoDetalleModel.create({
            ...detalle,
            pedido_id: pedidoCabecera.id,
          });
        }
      }
    }
    return pedidoCabecera;
  } catch (error) {
    console.error("Error al actualizar el detalle del pedido:", error);
    throw error;
  }
};

exports.updatePedidoItem = async (pedido_id, id, pedidoDetalleActualizado) => {
  try {
    console.log("ingresando a pedido_detalle_id", pedido_id, id);
    // Eliminar los detalles del pedido
    await PedidoDetalleModel.update(pedidoDetalleActualizado, {
      where: { pedido_id: pedido_id, id },
    });

    return id;
  } catch (error) {
    console.error("Error al eliminar el item del pedido:", error);
    throw error;
  }
};

exports.eliminadoLogicoItemPedido = async (pedido_id, id) => {
  try {
    console.log("ingresando a pedido_detalle_id", pedido_id, id);
    // Contar los items activos antes de eliminar
    const itemsActivos = await PedidoDetalleModel.count({
      where: {
        pedido_id: pedido_id,
        estado_item: {
          [Op.not]: 6, // Asume que el estado 6 significa eliminado lógicamente
        },
      },
    });

    // Eliminar los detalles del pedido
    await PedidoDetalleModel.update(
      { estado_item: 6, estado_pago_item: 6 },
      { where: { pedido_id: pedido_id, id: id } }
    );
    const item = await PedidoDetalleModel.findOne({
      where: { id: id, pedido_id: pedido_id },
    });
    await ProductoService.actualizarStockPorEliminadoLogico(
      item.producto_id,
      item.cantidad
    );

    // Si era el último item activo, marcar la cabecera como eliminada lógicamente
    if (itemsActivos === 1) {
      // Si solo había un item activo antes de eliminar
      await PedidoCabeceraModel.update(
        { estado_pedido: 6 },
        { where: { id: pedido_id } }
      ); // Asume que el estado 6 significa eliminado lógicamente
    }

    return id;
  } catch (error) {
    console.error("Error al eliminar el item del pedido:", error);
    throw error;
  }
};

exports.eliminadoLogicoCabeceraPedido = async (id) => {
  try {
    console.log("ingresando a pedido_id", id);
    // Eliminar lógicamente la cabecera del pedido
    await PedidoCabeceraModel.update({ estado_pedido: 6 }, { where: { id } });

    // Asumiendo que existe un modelo PedidoDetalleModel para los ítems del pedido
    // y que 'estado_item' es el campo que indica el estado del ítem (6 para eliminado)
    await PedidoDetalleModel.update(
      { estado_item: 6 },
      { where: { pedido_id: id } }
    );

    return id;
  } catch (error) {
    console.error("Error al eliminar el item del pedido:", error);
    throw error;
  }
};

exports.updatePedidoItem = async (pedido_id, id, pedidoDetalleActualizado) => {
  try {
    console.log("ingresando a pedido_detalle_id", pedido_id, id);
    // Eliminar los detalles del pedido
    await PedidoDetalleModel.update(pedidoDetalleActualizado, {
      where: { pedido_id: pedido_id, id },
    });

    return id;
  } catch (error) {
    console.error("Error al eliminar el item del pedido:", error);
    throw error;
  }
};
