'use client'

import React, { act, useEffect, useState } from 'react'
import { URL_INSCRIPCION, actividades } from '@/app/utils/constants'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { update, save } from '@/app/services/inscripcionService'

interface Params {
    params: { id: string }
}



let datosInscripcion: any
const NuevoPage = ({ params }: Params) => {
    const router = useRouter()
    const { id } = params
    const [nombre, setNombre] = useState('')
    const [apellido, setApellido] = useState('')
    const [nroDocumento, setNumeroDocumento] = useState('')
    const [actividadSeleccionada, setActividadSeleccionada] = useState(1)


    async function loadDatosInscripcion() {
        const response = await fetch(`/api/inscripcion/${id}`)
        const data = await response.json()
        setNombre(data.alumno.nombre)
        setApellido(data.alumno.apellido)
        setNumeroDocumento(data.alumno.dni)
        setActividadSeleccionada(data.actividad.id)
        datosInscripcion = data
    }

    useEffect(() => {
        if (id) loadDatosInscripcion()
    }, [])

    const onChangeActividad = ({ target }: any) => {
        setActividadSeleccionada(target.value)
    }


    const handlerRegistrarAlumno = async (e: any) => {
        e.preventDefault()

        const actividad = actividades.find(act => act.id == actividadSeleccionada)
        const dni = Number(nroDocumento)
        const nombreCompleto = nombre + ' ' + apellido
        if (id) {
            const alumno = { ...datosInscripcion.alumno, nombre, apellido, dni, nombreCompleto }
            const inscripcionModificada = { ...datosInscripcion, alumno, actividad }
            try {
               await update(id, JSON.stringify(inscripcionModificada)) 
               alert('Información actualizada correctamente')
            } catch (error:any) {
                alert('Error al actualizar inscripcion: ' + error.message)
            }
            
        } else {
            const inscripcion = {
                fecha: new Date(),
                membresiaActiva: true,
                aptaMedica: true,
                alumno: { nombre, apellido, dni, nombreCompleto },
                actividad
            }

            try {
               await save(JSON.stringify(inscripcion))
                router.push('/inscriptos')
            } catch (error: any) {
                alert('Error al registrar inscripcion: ' + error.message)
            }
        }
    }


    return (
        <div className="w-full max-w-xs my-4">
            <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handlerRegistrarAlumno}>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="nombre">
                        Nombre
                    </label>
                    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" onChange={(e) => setNombre(e.target.value)} id="nombre" type="text" value={nombre} placeholder="Nombre" />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="apellido">
                        Apellido
                    </label>
                    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="apellido" type="apellido" onChange={(e) => setApellido(e.target.value)} value={apellido} placeholder="Apellido" />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="dni">
                        DNI
                    </label>
                    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="dni" type="number" onChange={(e) => setNumeroDocumento(e.target.value)} value={nroDocumento} placeholder="Nro de documento" />
                </div>
                <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="actividad">
                        Actividad
                    </label>
                    <div className="relative">
                        <select onChange={onChangeActividad} value={actividadSeleccionada} className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" name='nroActividad' id="nroActividad">
                            {actividades.map(a =>
                                <option key={a.id} value={a.id}>{a.descripcion}</option>

                            )}
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                        </div>
                    </div>
                </div>
                <div className="flex items-center justify-between">
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                        {(id) ? 'Modificar' : 'Agregar'}
                    </button>
                    <Link href={'/inscriptos'}>
                        <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
                            Cancelar
                        </button>
                    </Link>

                </div>
            </form>
        </div>
    )
}

export default NuevoPage