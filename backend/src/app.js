import express from "express";
import dotenv from "dotenv"
import appCliente from './routers/cliente.js';
import appAutores from "./routers/autores.js";
import appCategorias from "./routers/categorias.js";
import appEditoriales from "./routers/editoriales.js";
import appEstado from "./routers/estado.js";
import appLibros from "./routers/libros.js";

dotenv.config();
const appExpress = express();

appExpress.use(express.json());
appExpress.use("/campus", appCliente);
appExpress.use("/autores", appAutores);
appExpress.use("/categorias", appCategorias);
appExpress.use("/editoriales", appEditoriales);
appExpress.use("/estado", appEstado);
appExpress.use("/libros", appLibros);





const config = {
  hostname: "127.10.16.15",
  port: 5020
};
appExpress.listen(config, ()=>{
  console.log(`http://${config.hostname}:${config.port}`);
})