import {Router} from 'express';
import mysql from "mysql2";

let con = undefined;
const appLibrosPrestados = Router();

appLibrosPrestados.use((req,res,next)=>{
    let myConfig = JSON.parse(process.env.MY_CONNECT);
    con = mysql.createPool(myConfig)
    next();
});

appLibrosPrestados.get("/", (req,res)=>{
    con.query(`SELECT p.id_prestamo AS "id", l.titulo AS "libro", p.fecha_devolucion AS "devolucion" FROM prestamo p INNER JOIN libro l ON p.id_libro = l.id_libro`, (err, data)=>{
        if(err){
            console.error("ocurrió un error intentando traer los datos de autores", err.message);
            res.status(err.status)
        } else {
            res.send(data);
        }
    })
})

export default appLibrosPrestados;