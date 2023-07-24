import {Router} from 'express';
import mysql from "mysql2";
import proxyPrestamos from "./../middleware/proxyPrestamos.js"
import { SignJWT, jwtVerify } from 'jose';
import session from 'express-session';

let con = undefined;
const appPrestamo = Router();

appPrestamo.use(session({secret:'mi-secreto', resave: false,saveUninitialized: true}));

appPrestamo.use("/:id?", async (req, res, next) => {
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


appPrestamo.use((req,res,next)=>{
    let myConfig = JSON.parse(process.env.MY_CONNECT);
    con = mysql.createPool(myConfig)
    next();
});

appPrestamo.get("/:id?", proxyPrestamos,async(req,res)=>{
    const jwt = req.session.jwt; 
    const encoder = new TextEncoder();  
    const jwtData = await jwtVerify(
        jwt,
        encoder.encode(process.env.JWT_PRIVATE_KEY)
    )
    let sql = (jwtData.payload.params.id)
    ? [`SELECT p.id_prestamo AS "id", u.nombre AS "usuario", u.apellido AS "apellido", p.estado AS "estado", p.fecha_prestamo AS "prestado_el", p.fecha_devolucion AS "caduca_el" FROM prestamo p INNER JOIN usuario u ON p.id_usuario = u.id_usuario WHERE u.id_usuario = ?` , jwtData.payload.params.id]
    : [`SELECT id_prestamo AS "id", estado AS "estado", fecha_prestamo AS "prestado_el", fecha_devolucion AS "caduca_el" FROM prestamo`]
    con.query(...sql, (err, data)=>{
        if(err){
            console.error("ocurrió un error intentando traer los datos de autores", err.message);
            res.status(err.status)
        } else {
            res.send(data);
        }
    })
})

export default appPrestamo;