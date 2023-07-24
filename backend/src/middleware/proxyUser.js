import express from 'express';
import 'reflect-metadata';
import {plainToClass} from 'class-transformer';
import {User} from '../controller/user.js';
import {Autor} from '../controller/autor.js'
import {validate} from 'class-validator';
import { jwtVerify } from "jose";
const proxyUser = express();
proxyUser.use(async(req,res,next)=>{
    try {
        const jwt = req.session.jwt;
        const encoder = new TextEncoder();
        const jwtData = await jwtVerify(
            jwt,
            encoder.encode(process.env.JWT_PRIVATE_KEY)
        )
        if(jwtData.payload.params.nacionalidad){
            let data = plainToClass(Autor, jwtData.payload.params, { excludeExtraneousValues: true });
        await validate(data);
        } 
        let data = plainToClass(User, jwtData.payload.params, { excludeExtraneousValues: true });
        await validate(data);
        next();
    } catch (err) {
        const statusCode = err.status || 500;
        const errorMessage = err.message || 'Ha ocurrido un error en el servidor.';
        res.status(statusCode).send(errorMessage);
    }
    })

export default proxyUser;