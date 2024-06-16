const ProductoModel = require("../models/producto");
const CategoriaModel = require("../models/categoria");
const SubcategoriaModel = require("../models/subcategoria");

exports.getAllProductos = async () => {
  return await ProductoModel.findAll({
    include: [
      {
        model: CategoriaModel,
        as : 'Categoria',
        attributes: ['id', 'nombre'],
      },
      {
        model: SubcategoriaModel, // Incluye el modelo de Subcategoria
        as : 'SubCategoria', // Renombra la relación
        attributes: ['id', 'nombre'], // Especifica los campos que quieres devolver
      }
    ],
    order: [['nombre', 'ASC']]
  });
};

  exports.createProducto = async (producto) => {
    return await ProductoModel.create(producto);
  }
  exports.getProductoById = async (id) => {
    return await ProductoModel.findByPk(id);
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
  
  exports.deleteProducto = async (id) => {
    return await ProductoModel.destroy({ where: { id } });
  };
  