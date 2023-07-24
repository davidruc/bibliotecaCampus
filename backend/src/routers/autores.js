import {Router} from 'express';
import mysql from "mysql2";

let con = undefined;
const appAutores = Router();

appAutores.use((req,res,next)=>{
    let myConfig = JSON.parse(process.env.MY_CONNECT);
    con = mysql.createPool(myConfig)
    next();
});

appAutores.get("/", (req,res)=>{
    con.query(`SELECT id_autor AS "id", nombre AS "name", apellido AS "lastname", nacionalidad AS "nacionality" FROM autor`, (err, data)=>{
        if(err){
            console.error("ocurrió un error intentando traer los datos de autores", err.message);
            res.status(err.status)
        } else {
            res.send(data);
        }
    })
})

export default appAutores;