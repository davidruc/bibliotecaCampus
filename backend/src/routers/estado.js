import {Router} from 'express';
import mysql from "mysql2";

let con = undefined;
const appEstado = Router();

appEstado.use((req,res,next)=>{
    let myConfig = JSON.parse(process.env.MY_CONNECT);
    con = mysql.createPool(myConfig)
    next();
});

appEstado.get("/", (req,res)=>{
    con.query(`SELECT id_estado AS "id", nombre AS "estado", descripcion AS "detalles" FROM estado_libro`, (err, data)=>{
        if(err){
            console.error("ocurrió un error intentando traer los datos de autores", err.message);
            res.status(err.status)
        } else {
            res.send(data);
        }
    })
})

export default appEstado;