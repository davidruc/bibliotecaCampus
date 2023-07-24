import { Expose, Type, Transform } from 'class-transformer';
import { IsDefined, MaxLength, MinLength, IsInt, IsEmail, IsString } from 'class-validator';
export class User {
    @IsInt()
    @Expose({ name: 'id_usuario' })
    @Transform(({value})=>{
        if(/^[0-9]+$/.test(value) || typeof value == "undefined") 
        return (value); else throw {status:400, message: "el dato del id ingresado es incorrecto, ingresa un número entero"}}, {toClassOnly: true})
        id_usuario: number;
      @Expose({name: "nombre"})
      @Transform(({value})=>{if(/^[a-z A-Z áéíóúÁÉÍÓÚñÑüÜ]+$/.test(value)) return value; else throw {status: 400, message:`El dato nombre de la mascota incumple los parametros acordados`};},{ toClassOnly: true})
        nombre: String;
        @Expose({name: "apellido"})
      @Transform(({value})=>{if(/^[a-z A-Z áéíóúÁÉÍÓÚñÑüÜ]+$/.test(value)) return value; else throw {status: 400, message:`El dato nombre de la mascota incumple los parametros acordados`};},{ toClassOnly: true})
        apellido: String;
        @Expose({name: "direccion"})
      @Transform(({value})=>{if(/^[a-z A-Z áéíóúÁÉÍÓÚñÑüÜ]+$/.test(value)) return value; else throw {status: 400, message:`El dato nombre de la mascota incumple los parametros acordados`};},{ toClassOnly: true})
        direccion: String;
        @Expose({name: "telefono"})
      @Transform(({value})=>{if(/^[a-z A-Z áéíóúÁÉÍÓÚñÑüÜ]+$/.test(value)) return value; else throw {status: 400, message:`El dato nombre de la mascota incumple los parametros acordados`};},{ toClassOnly: true})
        telefono: String;
        @Expose({name: "email"})
      @Transform(({value})=>{if(/^[a-z A-Z áéíóúÁÉÍÓÚñÑüÜ]+$/.test(value)) return value; else throw {status: 400, message:`El dato nombre de la mascota incumple los parametros acordados`};},{ toClassOnly: true})
        email: String;
    constructor(ID: number, nom_com: string, ema: string, direc: string, apll: string) {
      this.id_usuario = ID;
      this.nombre = nom_com;
      this.apellido = apll; 
      this.direccion = direc;
      this.email = ema;


    }
}