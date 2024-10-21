'use client'

import React, { useEffect, useState } from 'react'
import { Inscripcion } from '@/app/class/inscripcion'
import { useRouter } from 'next/navigation'
import { deleteById } from '@/app/services/inscripcionService'

export default function InscriptosPage () {

  const [inscriptos, setInscriptos] = useState([])
  const router = useRouter()

  useEffect(() => {
    fetch('/api/inscripcion').then(response => response.json()).then(data => setInscriptos(data));
  }, [])

  const handlerEliminarInscripcion = async (id: number) => {
    try {
      
      const respuestaUsuario = confirm('¿Desea eliminar la inscripcion?')

      console.log(respuestaUsuario)

      await deleteById(id)

      setInscriptos((list: any) => list.filter((i: Inscripcion) => i.id != id))

      alert('Inscripcion eliminada con exito!')
    } catch (error: any) {
      alert('Error al eliminar la inscripcion del alumno: ' + error.message)
    }
  }

  return (
    <div className='text-center p-10'>
      <h1 className='text-2xl font-bold my-4'>Inscripciones</h1>
      <div className='relative flex flex-col min-w-0 break-words w-full mb-6 mt-4'>
        <div className='block bg-transperant m-4  p-4 w-full overflow-x-auto'>
          <table className="w-full">
            <thead>
              <tr className='border border-solid border-l-0 border-r-0'>
                <th className='text-md px-6 py-3'>Alumno</th>
                <th className='text-md px-6 py-3'>DNI</th>
                <th className='text-md px-6 py-3'>Fecha de inscripcion</th>
                <th className='text-md px-6 py-3'>Acción</th>
              </tr>
            </thead>
            <tbody>
              {inscriptos.map(({ id, alumno, fecha }: Inscripcion) => {
                return <tr key={id} className='border border-solid border-l-0 border-r-0'>
                  <th className='text-md px-6 py-3'>{alumno.nombre + ' ' + alumno.apellido}</th>
                  <th className='text-md px-6 py-3'>{alumno.dni}</th>
                  <th className='text-md px-6 py-3'>{fecha}</th>
                  <th>
                    <button type="button" onClick={() => {
                      router.push(`/inscriptos/modificar/${id}`)
                    }}
                      className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 shadow-lg shadow-green-500/50 dark:shadow-lg dark:shadow-green-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Actualizar</button>
                    <button type="button" onClick={() => handlerEliminarInscripcion(id)} className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Eliminar</button>
                  </th>
                </tr>
              })
              }
            </tbody>
          </table>
        </div>
      </div>

    </div>
  )
}