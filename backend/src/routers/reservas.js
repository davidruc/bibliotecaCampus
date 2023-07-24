import {Router} from 'express';
import mysql from "mysql2";

let con = undefined;
const appReservas = Router();

appReservas.use((req,res,next)=>{
    let myConfig = JSON.parse(process.env.MY_CONNECT);
    con = mysql.createPool(myConfig)
    next();
});

appReservas.get("/", (req,res)=>{
    con.query(`SELECT reserva.id_reserva AS "id", usuario.nombre AS "usuario", libro.titulo AS "libro" , reserva.estado AS "estado", reserva.fecha_reserva AS "reservado_el", reserva.fecha_reserva AS "caducacion_reserva" FROM reserva INNER JOIN usuario ON reserva.id_usuario = usuario.id_usuario INNER JOIN libro ON reserva.id_libro = libro.id_libro`, (err, data)=>{
        if(err){
            console.error("ocurrió un error intentando traer los datos de autores", err.message);
            res.status(err.status)
        } else {
            res.send(data);
        }
    })
})

export default appReservas;