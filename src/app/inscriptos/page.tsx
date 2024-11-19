'use client'

import React, { useEffect, useState } from 'react'

import { useRouter } from 'next/navigation'
import { deleteById } from '@/services/inscripcionService'
import Buscador from '@/components/Buscador'
import { useSearchParams } from 'next/navigation'
import { Inscripcion } from '@prisma/client'



export default function InscriptosPage() {

  const [inscriptos, setInscriptos] = useState([])
  const router = useRouter()
  const searchParams = useSearchParams()



  useEffect(() => {
    let url = '/api/alumno'
    if (searchParams.has('busqueda'))
      url = `${url}?busqueda=${searchParams.get('busqueda')}`

    fetch(url,
      {
        cache:'no-store'
      }
    ).then(response => response.json()).then(data => setInscriptos(data));
  }, [])

  const handlerEliminarInscripcion = async (id: number) => {
    try {
      const isEliminacionConfirmada = confirm('¿Desea eliminar la inscripcion?')
      if (isEliminacionConfirmada) {
        await deleteById(id)
        setInscriptos((list: any) => list.filter((i: Inscripcion) => i.id != id))

        alert('Inscripcion eliminada con exito!')
      }
    } catch (error: any) {
      alert('Error al eliminar la inscripcion del alumno: ' + error.message)
    }
  }

  return (
    <div className='container'>
      <div className='text-center p-10'>
        <h1 className='text-2xl font-bold my-4'>Inscripciones</h1>
        <Buscador setInscriptos = {setInscriptos} />
        <div className='relative flex flex-col min-w-0 break-words w-full mb-6 mt-4'>
          {inscriptos.length != 0 ? 
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
                {inscriptos.map((alumno: any) => {
                  return <tr key={alumno.id} className='border border-solid border-l-0 border-r-0'>
                    <th className='text-md px-6 py-3'>{alumno.nombreCompleto}</th>
                    <th className='text-md px-6 py-3'>{alumno.dni}</th>
                    <th className='text-md px-6 py-3'>{alumno.inscripciones.length}</th>
                    <th>
                      <button type="button" onClick={() => {
                        router.push(`/inscriptos/detalles/${alumno.id}`)
                      }}
                        className="text-blakc btn btn-success text-sm px-5 py-2.5 text-center me-2 mb-2">Detalles</button>
                      <button type="button" onClick={() => handlerEliminarInscripcion(alumno.id)} className="text-white btn btn-danger   text-sm px-5 py-2.5 text-center me-2 mb-2">Eliminar</button>
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