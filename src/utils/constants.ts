import { describe } from "node:test"

const HOST = "http://localhost:9090/fitnnesGym"


export const CONTEXTO_ALUMNO = `${HOST}/alumno`
export const CONTEXTO_EJERCICIO = `${HOST}/ejercicio`
export const URL_INSCRIPCION = `${HOST}/inscripcion`
export const actividadesAlumno = [
    {
      id: 1,
      descripcion: 'Musculacion',
      registrado: false,
    },
    {
      id: 2,
      descripcion: 'Crossfit',
      registrado: false,
    },
    {
      id: 3,
      descripcion: 'Funcional',
      registrado: false,
    }
  ]