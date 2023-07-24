import {Router} from 'express';
import mysql from "mysql2";

let con = undefined;
const appLibros = Router();

appLibros.use((req,res,next)=>{
    let myConfig = JSON.parse(process.env.MY_CONNECT);
    con = mysql.createPool(myConfig)
    next();
});

appLibros.get("/", (req,res)=>{
    con.query(`SELECT libro.id_libro AS "id", libro.titulo AS "libro", editorial.nombre AS "editorial", autor.nombre AS "autor", autor.apellido AS "apellidos" FROM libro INNER JOIN editorial ON libro.id_editorial = editorial.id_editorial INNER JOIN autor ON libro.id_autor = autor.id_autor`, (err, data)=>{
        if(err){
            console.error("ocurrió un error intentando traer los datos de autores", err.message);
            res.status(err.status)
        } else {
            res.send(data);
        }
    })
})

export default appLibros;