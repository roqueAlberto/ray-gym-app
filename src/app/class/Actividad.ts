export default class Actividad {
    private _id: number
    private _descripcion: string


    constructor() {

    }

    set id(id:number){
        this._id = id
    }

    get id(){
        return this._id
    }

    set descripcion(descripcion: string){
         this._descripcion = descripcion
    }

    get descripcion(){
        return this._descripcion
    }
}