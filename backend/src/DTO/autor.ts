import { Expose, Type, Transform } from 'class-transformer';
import { IsDefined, MaxLength, MinLength, IsInt, IsString } from 'class-validator';
export class Autor {
    @IsInt()
    @Expose({ name: 'id_autor' })
    @Transform(({value})=>{
        if(/^[0-9]+$/.test(value) || typeof value == "undefined") 
        return (value); else throw {status:400, message: "el dato del id ingresado es incorrecto, ingresa un número entero"}}, {toClassOnly: true})
        id_autor: number;
      @Expose({name: "nombre"})
      @Transform(({value})=>{if(/^[a-z A-Z áéíóúÁÉÍÓÚñÑüÜ]+$/.test(value)) return value; else throw {status: 400, message:`El dato nombre de la mascota incumple los parametros acordados`};},{ toClassOnly: true})
        nombre: String;
        @Expose({name: "apellido"})
      @Transform(({value})=>{if(/^[a-z A-Z áéíóúÁÉÍÓÚñÑüÜ]+$/.test(value)) return value; else throw {status: 400, message:`El dato nombre de la mascota incumple los parametros acordados`};},{ toClassOnly: true})
        apellido: String;
        @Expose({name: "nacionalidad"})
      @Transform(({value})=>{if(/^[a-z A-Z áéíóúÁÉÍÓÚñÑüÜ]+$/.test(value)) return value; else throw {status: 400, message:`El dato nombre de la mascota incumple los parametros acordados`};},{ toClassOnly: true})
        nacionalidad: String;
    constructor(ID: number, nom_com: string, nacionalidad: string, apll: string) {
      this.id_autor = ID;
      this.nombre = nom_com;
      this.apellido = apll;
      this.nacionalidad = nacionalidad;
    }
}