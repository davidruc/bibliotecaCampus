import {Router} from 'express';
import mysql from "mysql2";

let con = undefined;
const appEditoriales = Router();

appEditoriales.use((req,res,next)=>{
    let myConfig = JSON.parse(process.env.MY_CONNECT);
    con = mysql.createPool(myConfig)
    next();
});

appEditoriales.get("/", (req,res)=>{
    con.query(`SELECT id_editorial AS "id", nombre AS "editorial", direccion AS "ubicacion" FROM editorial`, (err, data)=>{
        if(err){
            console.error("ocurrió un error intentando traer los datos de autores", err.message);
            res.status(err.status)
        } else {
            res.send(data);
        }
    })
})

export default appEditoriales;