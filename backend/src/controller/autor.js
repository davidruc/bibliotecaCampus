var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Expose, Transform } from 'class-transformer';
import { IsInt } from 'class-validator';
export class Autor {
    constructor(ID, nom_com, nacionalidad, apll) {
        this.id_autor = ID;
        this.nombre = nom_com;
        this.apellido = apll;
        this.nacionalidad = nacionalidad;
    }
}
__decorate([
    IsInt(),
    Expose({ name: 'id_autor' }),
    Transform(({ value }) => {
        if (/^[0-9]+$/.test(value) || typeof value == "undefined")
            return (value);
        else
            throw { status: 400, message: "el dato del id ingresado es incorrecto, ingresa un número entero" };
    }, { toClassOnly: true }),
    __metadata("design:type", Number)
], Autor.prototype, "id_autor", void 0);
__decorate([
    Expose({ name: "nombre" }),
    Transform(({ value }) => { if (/^[a-z A-Z áéíóúÁÉÍÓÚñÑüÜ]+$/.test(value))
        return value;
    else
        throw { status: 400, message: `El dato nombre de la mascota incumple los parametros acordados` }; }, { toClassOnly: true }),
    __metadata("design:type", String)
], Autor.prototype, "nombre", void 0);
__decorate([
    Expose({ name: "apellido" }),
    Transform(({ value }) => { if (/^[a-z A-Z áéíóúÁÉÍÓÚñÑüÜ]+$/.test(value))
        return value;
    else
        throw { status: 400, message: `El dato nombre de la mascota incumple los parametros acordados` }; }, { toClassOnly: true }),
    __metadata("design:type", String)
], Autor.prototype, "apellido", void 0);
__decorate([
    Expose({ name: "nacionalidad" }),
    Transform(({ value }) => { if (/^[a-z A-Z áéíóúÁÉÍÓÚñÑüÜ]+$/.test(value))
        return value;
    else
        throw { status: 400, message: `El dato nombre de la mascota incumple los parametros acordados` }; }, { toClassOnly: true }),
    __metadata("design:type", String)
], Autor.prototype, "nacionalidad", void 0);
