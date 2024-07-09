const ProductoModel = require("../models/producto");
const CategoriaModel = require("../models/categoria");
const SubcategoriaModel = require("../models/subcategoria");

exports.getAllProductos = async () => {
  return await ProductoModel.findAll({
    include: [
      {
        model: CategoriaModel,
        as: "Categoria",
        attributes: ["id", "nombre"],
      },
      {
        model: SubcategoriaModel,
        as: "SubCategoria",
        attributes: ["id", "nombre"],
      },
    ],
    order: [["nombre", "ASC"]],
  });
};

exports.getProductoById = async (id) => {
  return await ProductoModel.findByPk(id, {
    include: [
      {
        model: CategoriaModel,
        as: "Categoria",
        attributes: ["id", "nombre"],
      },
      {
        model: SubcategoriaModel,
        as: "SubCategoria",
        attributes: ["id", "nombre"],
      },
    ],
    order: [["nombre", "ASC"]],
  });
};

exports.getProductosIdNombre = async () => {
  return await ProductoModel.findAll({
    attributes: ["id", "nombre"], // Selecciona sólo los atributos 'id' y 'nombre'
    order: [["nombre", "ASC"]], // Ordena los productos por nombre en orden ascendente
  });
};

exports.createProducto = async (producto) => {
  return await ProductoModel.create(producto);
};

exports.updateProducto = async (id, productoActualizado) => {
  try {
    // Buscar el producto por su ID
    const producto = await ProductoModel.findByPk(id);

    if (!producto) {
      throw new Error("Producto no encontrado");
    }

    // Actualizar los campos deseados del producto
    await producto.update(productoActualizado);

    // El producto actualizado se encuentra ahora en el objeto 'producto'

    return producto;
  } catch (error) {
    throw new Error("Error al actualizar el producto: " + error.message);
  }
};

exports.deleteProducto = async (id) => {// funcion para bajar stock por eliminado logico de un item de pedido
  return await ProductoModel.destroy({ where: { id } });
};
exports.actualizarStock = async (id, cantidad) => {
  try {
    console.log("id, cantidad", id, cantidad);
    // Buscar el producto por su ID
    const producto = await ProductoModel.findByPk(id);

    if (!producto) {
      throw new Error("Producto no encontrado");
    }

    // Actualizar el stock del producto
    producto.stock = producto.stock - cantidad;

    // Guardar los cambios en la base de datos
    await producto.save();

    return producto;
  } catch (error) {
    throw new Error(
      "Error al actualizar el stock del producto: " + error.message
    );
  }
};

exports.actualizarStockPorEliminadoLogico = async (id, cantidad) => {
  try {
    console.log("id, cantidad", id, cantidad);
    // Buscar el producto por su ID
    const producto = await ProductoModel.findByPk(id);

    if (!producto) {
      throw new Error("Producto no encontrado");
    }

    // Actualizar el stock del producto
    producto.stock = producto.stock + cantidad;

    // Guardar los cambios en la base de datos
    await producto.save();

    return producto;
  } catch (error) {
    throw new Error(
      "Error al actualizar el stock del producto: " + error.message
    );
  }
};
exports.eliminadoLogicoCabeceraPedido = async (id) => {
  try {
    // Buscar el producto por su ID
    const producto = await ProductoModel.findByPk(id);

    if (!producto) {
      throw new Error("Producto no encontrado");
    }

    // Actualizar el stock del producto
    producto.stock = producto.stock + cantidad;

    // Guardar los cambios en la base de datos
    await producto.save();

    return producto;
  } catch (error) {
    throw new Error(
      "Error al actualizar el stock del producto: " + error.message
    );
  }
}