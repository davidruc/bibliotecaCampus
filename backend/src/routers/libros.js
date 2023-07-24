import {Router} from 'express';
import proxyLibros from "./../middleware/proxyLibros.js"
import mysql from "mysql2";
import { SignJWT, jwtVerify } from 'jose';
import session from 'express-session';


let con = undefined;
const appLibros = Router();

appLibros.use(session({secret:'mi-secreto', resave: false,saveUninitialized: true}));

appLibros.use("/:id?", async (req, res, next) => {
    try {  
        const encoder = new TextEncoder(); 
        const payload = { body: req.body, params: req.params };
        const jwt = await new SignJWT(payload)
            .setProtectedHeader({ alg: "HS256", typ: "JWT" })
            .setIssuedAt()
            .setExpirationTime("20s")
            .sign(encoder.encode(process.env.JWT_PRIVATE_KEY));
        req.session.jwt = jwt;
        res.cookie('libros', jwt , {httpOnly : true});
        next();
    } catch (err) {
        console.error('Error al generar el JWT:', err.message);
        res.sendStatus(500);
    }
});

appLibros.use((req,res,next)=>{
    let myConfig = JSON.parse(process.env.MY_CONNECT);
    con = mysql.createPool(myConfig)
    next();
});

appLibros.get("/:id?", proxyLibros , async(req,res)=>{
    const jwt = req.session.jwt; 
    const encoder = new TextEncoder();  
    const jwtData = await jwtVerify(
        jwt,
        encoder.encode(process.env.JWT_PRIVATE_KEY)
    )
    let sql = (jwtData.payload.params.id)
    ? [`SELECT l.id_libro AS "id", l.titulo AS "libro", a.nombre AS "autor" FROM libro l INNER JOIN autor a ON l.id_autor = a.id_autor WHERE a.id_autor = ?`, jwtData.payload.params.id]
    : [`SELECT libro.id_libro AS "id", libro.titulo AS "libro", editorial.nombre AS "editorial", autor.nombre AS "autor", autor.apellido AS "apellidos" FROM libro INNER JOIN editorial ON libro.id_editorial = editorial.id_editorial INNER JOIN autor ON libro.id_autor = autor.id_autor`]
    con.query(...sql, (err, data)=>{
        if(err){
            console.error("ocurrió un error intentando traer los datos de autores", err.message);
            res.status(err.status)
        } else {
            res.send(data);
        }
    })
})

export default appLibros;