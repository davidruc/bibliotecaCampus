import {Router} from 'express';
import mysql from "mysql2";
import proxyUser from "./../middleware/proxyUser.js"
import { SignJWT, jwtVerify } from 'jose';
import session from 'express-session'; 

let con = undefined;
const appAutores = Router();

appAutores.use(session({secret:'mi-secreto', resave: false,saveUninitialized: true}));

appAutores.use("/:id?", async (req, res, next) => {
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

appAutores.use((req,res,next)=>{
    let myConfig = JSON.parse(process.env.MY_CONNECT);
    con = mysql.createPool(myConfig)
    next();
});

appAutores.get("/:nacionalidad?", proxyUser, async (req,res)=>{
    const jwt = req.session.jwt; 
    const encoder = new TextEncoder();  
    const jwtData = await jwtVerify(
        jwt,
        encoder.encode(process.env.JWT_PRIVATE_KEY)
    )
    let sql = (jwtData.payload.params.nacionalidad)
    ? [`SELECT id_autor AS "id", nombre AS "name", apellido AS "lastname", nacionalidad AS "nacionality" FROM autor WHERE nacionalidad = '?'` ,jwtData.payload.params.nacionalidad]
    : [`SELECT id_autor AS "id", nombre AS "name", apellido AS "lastname", nacionalidad AS "nacionality" FROM autor`] 
    con.query(...sql, (err, data)=>{
        if(err){
            console.error("ocurrió un error intentando traer los datos de autores", err.message);
            res.status(err.status)
        } else {
            res.send(data);
        }
    })
})

export default appAutores;