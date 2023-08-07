const express = require("express");
//const mongoose = require("mongoose");
const cors = require("cors");
async function main() {
    try {


      // Configurar las opciones de CORS
const corsOptions = {
  origin: ["https://vivosis-frontend.vercel.app", "http://localhost:3000"], // Reemplaza con la URL correcta de tu frontend
  credentials: true, // Permitir el intercambio de cookies y encabezados de autenticación
  optionSuccessStatus: 200,
};

  
  const port = process.env.PORT || 4000;    
  const sequelize = require("./database/database.js");
  const  express = require("express");
  const app = express();
  const clienteRouter = require("./routes/ClienteRoutes.js");
  const puntoEntregaRouter = require("./routes/PuntoEntregaRoutes.js");
  const direccionRouter = require("./routes/DireccionRoutes.js");
  const categoriaRouter = require("./routes/CategoriaRoutes.js");
  const subcategoriaRouter = require("./routes/SubcategoriaRoutes.js");
  const productoRouter = require("./routes/ProductoRoutes.js");
  const authRouter = require("./routes/AuthRoutes.js");
  const ingresoRouter = require("./routes/IngresoRoutes.js");
  const pedidoRouter = require("./routes/PedidoRoutes.js");
  const estadoPedidoRouter = require("./routes/EstadoPedidoRoutes.js");
  const estadoPagoRouter = require("./routes/EstadoPagoRoutes.js");

  app.use(cors(corsOptions));
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.use("/api/cliente", clienteRouter);
  app.use("/api/puntoentrega", puntoEntregaRouter);
  app.use("/api/direccion", direccionRouter);
  app.use("/api/categoria", categoriaRouter);
  app.use("/api/subcategoria", subcategoriaRouter);
  app.use("/api/producto", productoRouter);
  app.use("/api/auth", authRouter);
  app.use("/api/ingreso", ingresoRouter);
  app.use("/api/pedido", pedidoRouter);
  app.use("/api/estadopedido", estadoPedidoRouter);
  app.use("/api/estadopago", estadoPagoRouter);
  
  //asd

  
      await sequelize.authenticate();
      await sequelize.sync();
      console.log('Connection has been established successfully.');
      app.listen(port, () => {
        console.log("Server running on port 4000");
      });
  
    } catch (error) {
      console.error('Unable to connect to the database:', error);
    }
  }
  main();//asd