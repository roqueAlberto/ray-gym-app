import { describe } from "node:test"

const HOST = "http://localhost:9090/fitnnesGym"


export const CONTEXTO_ALUMNO = `${HOST}/alumno`
export const CONTEXTO_EJERCICIO = `${HOST}/ejercicio`
export const URL_INSCRIPCION = `${HOST}/inscripcion`
export const actividades  = [{
    id: 1,
    descripcion: 'MUSCULACION',
    activo: false
},
{
    id: 2,
    descripcion: 'CROSSFIT',
    activo: false
},
{
    id: 3,
    descripcion: 'FUNCIONAL',
    activo: false
}]