import {Router} from 'express';
import mysql from "mysql2";

let con = undefined;
const appPrestamo = Router();

appPrestamo.use((req,res,next)=>{
    let myConfig = JSON.parse(process.env.MY_CONNECT);
    con = mysql.createPool(myConfig)
    next();
});

appPrestamo.get("/", (req,res)=>{
    con.query(`SELECT id_prestamo AS "id", estado AS "estado", fecha_prestamo AS "prestado_el", fecha_devolucion AS "caduca_el" FROM prestamo`, (err, data)=>{
        if(err){
            console.error("ocurrió un error intentando traer los datos de autores", err.message);
            res.status(err.status)
        } else {
            res.send(data);
        }
    })
})

export default appPrestamo;