import React, { act, useEffect, useState } from 'react'
import { update, save, deleteByAlumnoAndActividad } from '@/services/inscripcionService'

const InscripcionActividad = ({inscripciones, alumnoID}:any) => {

    const [musculacionInscripto, setMusculacionInscripto] = useState(false)
    const [crossfitInscripto, setCrossfitInscripto] = useState(false)
    const [funcionalInscripto, setFuncionalInscripto] = useState(false)


    async function handlerInscripcionActividad(idActividad: number, actividad: string) {
        const aceptado = confirm('¿Desea inscribir al alumno a ' + actividad + '?')

        if (aceptado) {
            try {
                await save(JSON.stringify({alumnoID, idActividad }))
                alert('Se registro la inscripion a ' + actividad + ' con exito!!!')

                actualizarEstadoActividad(actividad, true)
            } catch (error: any) {
                alert('No se puedo registrar la inscripcion a ' + actividad + '. Error: ' + error.message)
            }
        }
    }

    async function onEleminarInscripcionByActividad(idActividad: number, actividad: string) {
        const aceptado = confirm('¿Desea eliminar ' + actividad + ' del registro de inscripciones del alumno?')

        if (aceptado) {
            try {
                await deleteByAlumnoAndActividad(alumnoID, idActividad)
                alert('Se registro la inscripion a ' + actividad + ' con exito!!!')

                actualizarEstadoActividad(actividad, false)
            } catch (error: any) {
                alert('No se pudo eliminar la inscripcion a ' + actividad + '. Error: ' + error.message)
            }
        }
    }

    function actualizarEstadoActividad(descActividad: string, estado: boolean) {
        if (descActividad === 'MUSCULACION') {
            setMusculacionInscripto(estado)
        } else if (descActividad === 'CROSSFIT') {
            setCrossfitInscripto(estado)
        } else {
            setFuncionalInscripto(estado)
        }
    }

    return (
        <ul>
            <li>
                <div className="form-check my-2 ms-3">
                    <label className="form-check-label" htmlFor="flexCheckChecked"> MUSCULACION</label>
                    {musculacionInscripto ? <button onClick={() => onEleminarInscripcionByActividad(1, 'MUSCULACION')}>Eliminar</button> : <button onClick={() => handlerInscripcionActividad(1, 'MUSCULACION')}>Agregar</button>}
                </div>
            </li>
            <li>
                <div className="form-check my-2 ms-3">
                    <label className="form-check-label" htmlFor="flexCheckChecked"> CROSSFIT</label>
                    {crossfitInscripto ? <button onClick={() => onEleminarInscripcionByActividad(2, 'CROSSFIT')}>Eliminar</button> : <button onClick={() => handlerInscripcionActividad(2, 'CROSSFIT')}>Agregar</button>}
                </div>
            </li>
            <li>
                <div className="form-check my-2 ms-3">
                    <label className="form-check-label" htmlFor="flexCheckChecked"> FUNCIONAL</label>
                    {funcionalInscripto ? <button onClick={() => onEleminarInscripcionByActividad(3, 'FUNCIONAL')}>Eliminar</button> : <button onClick={() => handlerInscripcionActividad(3, 'FUNCIONAL')}>Agregar</button>}
                </div>
            </li>
        </ul>
    )
}

export default InscripcionActividad