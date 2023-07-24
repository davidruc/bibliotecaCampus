import {Router} from 'express';
import mysql from "mysql2";
import proxyCategoria from "./../middleware/proxyCategoria.js"
import { SignJWT, jwtVerify } from 'jose';
import session from 'express-session';

let con = undefined;
const appCategorias = Router();

appCategorias.use(session({secret:'mi-secreto', resave: false,saveUninitialized: true}));

appCategorias.use("/:id?", async (req, res, next) => {
    try {  
        const encoder = new TextEncoder(); 
        const payload = { body: req.body, params: req.params };
        const jwt = await new SignJWT(payload)
            .setProtectedHeader({ alg: "HS256", typ: "JWT" })
            .setIssuedAt()
            .setExpirationTime("20s")
            .sign(encoder.encode(process.env.JWT_PRIVATE_KEY));
        req.session.jwt = jwt;
        res.cookie('categorias', jwt , {httpOnly : true});
        next();
    } catch (err) {
        console.error('Error al generar el JWT:', err.message);
        res.sendStatus(500);
    }
});


appCategorias.use((req,res,next)=>{
    let myConfig = JSON.parse(process.env.MY_CONNECT);
    con = mysql.createPool(myConfig)
    next();
});



appCategorias.get("/:id?", proxyCategoria , async(req,res)=>{
    const jwt = req.session.jwt; 
    const encoder = new TextEncoder();  
    const jwtData = await jwtVerify(
        jwt,
        encoder.encode(process.env.JWT_PRIVATE_KEY)
    )
    let sql = (jwtData.payload.params.id)
    ? [`SELECT l.id_libro AS "id", l.titulo AS "libro",  c.nombre AS "categoria" FROM libro l INNER JOIN categoria c ON l.id_categoria = c.id_categoria WHERE c.id_categoria = ?`, jwtData.payload.params.id]
    : [`SELECT id_categoria AS "id", nombre AS "categoria" FROM categoria`]
    con.query(...sql, (err, data)=>{
        if(err){
            console.error("ocurrió un error intentando traer los datos de autores", err.message);
            res.status(err.status)
        } else {
            res.send(data);
        }
    })
})

export default appCategorias;