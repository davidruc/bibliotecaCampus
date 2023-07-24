import {Router} from 'express';
import mysql from "mysql2";

let con = undefined;
const appCategorias = Router();

appCategorias.use((req,res,next)=>{
    let myConfig = JSON.parse(process.env.MY_CONNECT);
    con = mysql.createPool(myConfig)
    next();
});

appCategorias.get("/", (req,res)=>{
    con.query(`SELECT id_categoria AS "id", nombre AS "categoria" FROM categoria`, (err, data)=>{
        if(err){
            console.error("ocurrió un error intentando traer los datos de autores", err.message);
            res.status(err.status)
        } else {
            res.send(data);
        }
    })
})

export default appCategorias;