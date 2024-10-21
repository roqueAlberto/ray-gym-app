import Actividad from './Actividad';
import { Alumno } from './Alumno'

export class Inscripcion {
    private _id: number;
    private _alumno: Alumno;
    private _fecha: string | undefined
    private _nroActividad: number;
    private _actividad: Actividad | undefined
    private _membresiaActiva: boolean
    private _aptaMedica: boolean

    constructor() { }


    set alumno(alumno: Alumno) {
        this._alumno = alumno
    }

    get alumno() {
        return this._alumno
    }

    
    get descAptaMedica(): string {
        return this._aptaMedica ? "SI" : "NO"
    }


    get descMembresiaActiva(): string {
        return this._membresiaActiva ? "SI" : "NO"
    }

    set fecha(fecha: string | undefined) {
        this._fecha = fecha
    }

    get fecha(){
        return this._fecha
    }

    set nroActividad(nroActividad: number) {
        this._nroActividad = nroActividad
    }

    get nroActividad() {
        return this._nroActividad
    }

    get id():number{
        return this._id
    }

    set id(id: number) {
        this._id = id
    }

    set membresiaActiva(membresiaActiva: boolean) {
        this._membresiaActiva = membresiaActiva;
    }

    get membresiaActiva(){
       return this._membresiaActiva
    }

    set aptaMedica(aptaMedica: boolean) {
        this._aptaMedica = aptaMedica;
    }

    get aptaMedica(){
        return this._aptaMedica
    }

    set actividad(actividad: Actividad | undefined) {
        this._actividad = actividad
    }

    get actividad(){
        return this._actividad
    }


}