'use client'
import React from 'react'
import { useRouter } from 'next/navigation'
import { deleteById } from '@/services/alumnoService'

const ListaAlumnos = ({ alumnos }: any) => {

    const router = useRouter()

    const onClickEliminarAlumno = async (id: number) => {
        try {
            const isAceptado = confirm('¿Desea eliminar al alumno del registro?')
            if (isAceptado) {
                await deleteById(id)
                alert('Registro del alumno eliminado con exito!')
                router.refresh()
            }
        } catch (error: any) {
            alert('Error al eliminar la inscripcion del alumno: ' + error.message)
        }
    }

    return (
        <div className='container'>
            <div className='text-center p-10'>
                <h1 className='text-2xl font-bold my-4'>Inscripciones</h1>

                <div className='relative flex flex-col min-w-0 break-words w-full mb-6 mt-4'>
                    {alumnos.length != 0 ?
                        <div className='block bg-transperant m-4  p-4 w-full overflow-x-auto'>
                            <table className="w-full table">
                                <thead className='thead-dark'>
                                    <tr className='border border-solid border-l-0 border-r-0'>
                                        <th className='text-md px-6 py-3'>Nombre</th>
                                        <th className='text-md px-6 py-3'>DNI</th>
                                        <th className='text-md px-6 py-3'>Actividades registradas</th>
                                        <th className='text-md px-6 py-3'>Acción</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {alumnos.map((alumno: any) => {
                                        return <tr key={alumno.id} className='border border-solid border-l-0 border-r-0'>
                                            <th className='text-md px-6 py-3'>{alumno.nombreCompleto}</th>
                                            <th className='text-md px-6 py-3'>{alumno.dni}</th>
                                            <th className='text-md px-6 py-3'>{alumno.inscripciones.length}</th>
                                            <th>
                                                <button type="button" onClick={() => { router.push(`/inscriptos/detalles/${alumno.id}`) }}
                                                    className="text-blakc btn btn-success text-sm px-5 py-2.5 text-center me-2 mb-2">Detalles</button>
                                                <button type="button" onClick={() => onClickEliminarAlumno(alumno.id)} className="text-white btn btn-danger text-sm px-5 py-2.5 text-center me-2 mb-2">Eliminar</button>
                                            </th>
                                        </tr>
                                    })
                                    }
                                </tbody>
                            </table>
                        </div> : 'Sin resultados'}
                </div>
            </div>
        </div>
    )
}

export default ListaAlumnos