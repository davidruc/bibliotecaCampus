import {Router} from 'express';
import proxyUser from '../middleware/proxyUser.js';
import mysql from "mysql2";

let con = undefined;
const appCliente = Router();

appCliente.use((req,res,next)=>{
    let myConfig = JSON.parse(process.env.MY_CONNECT);
    con = mysql.createPool(myConfig)
    next();
});

appCliente.get("/", (req,res)=>{
    con.query(`SELECT id_usuario AS "id", nombre AS "name", email FROM usuario`, (err, data)=>{
        if(err){
            console.error("ocurrió un error intentando traer los datos de autores", err.message);
            res.status(err.status)
        } else {
            res.send(data);
        }
    })
})


export default appCliente;