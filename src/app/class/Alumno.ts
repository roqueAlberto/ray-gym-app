export class Alumno {

    private _id:number
    private _nombre: string  // Se distingue con otra nombre de variable para que no choque con el get y no se aplique recursividad
    private _apellido: string
    private _dni: number

    constructor() {
    }

    
    get id(){
        return this._id
    }

    set id(id: number){
        this._id = id
    }

    get nombre() {
        return this._nombre;
    }

    set nombre(nombre: string) {
        this._nombre = nombre
    }

    get apellido(): string {
        return this._apellido
    }

    set apellido(apellido: string) {
        this._apellido = apellido
    }

    set dni(dni: number) {
        this._dni = dni;
    }

    get dni(): number {
        return this._dni
    }
}