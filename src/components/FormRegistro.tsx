'use client'

import React, { useCallback, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { inscribirActividad, deleteByAlumnoAndActividad } from '@/services/inscripcionService'
import { update, save } from '@/services/alumnoService'
import {actividadesAlumno} from '@/utils/constants'
import { Actividad, InscripcionDetalle } from '@/types'


const FormRegistro = ({ params }: { params: { id: string } }) => {
  const { id } = params
  const [actividades, setActividades] = useState<Actividad[]>(actividadesAlumno)
  const [alumno, setAlumno] = useState({ nombre: '', apellido: '', dni: '' })

  const router = useRouter()

  const cargarAlumno = useCallback(async () => {
    if (!id) return
    const response = await fetch(`/api/alumno/${id}`)
    const data = await response.json()
    const { nombre, apellido, dni, inscripciones } = data
    setAlumno({ nombre, apellido, dni })
    setActividades(prev => prev.map((actividad) => ({
      ...actividad,
      registrado: inscripciones.some((inscripcion: InscripcionDetalle) => actividad.id === inscripcion.actividad.id)
    })))
  }, [id])

  useEffect(() => {
    cargarAlumno()
  }, [cargarAlumno])


  const onChangeAlumno = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = target
    setAlumno({ ...alumno, [name]: value })
  }


  const onClickGuardar = async () => {
    try {
      const nombreCompleto = alumno.nombre.concat(' ').concat(alumno.apellido)
      const registro = { ...alumno,['dni']: Number(alumno.dni) , nombreCompleto }

      if (params.id) {
        await update(params.id, registro)
        alert('Información actualizada correctamente')
      } else {
        const response = await save(registro)
        router.push(`/inscriptos/detalles/${response.id}`)
      }
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Error desconocido'
      alert('Ocurrio un error al realizar la acción. Mensaje de error: ' + message)
    }
  }


  const registrarActividad = async (nroActividad: number, actividad: string) => {
    const isConfirmado = confirm('¿Desea inscribir al alumno a ' + actividad + '?')

    if (isConfirmado) {
      try {
        await inscribirActividad(Number(id), nroActividad)
        establecerEstadoActividad(nroActividad, true)

        alert('Se registro la inscripion a ' + actividad + ' con exito!!!')
        
      } catch (error: unknown) {
        const message = error instanceof Error ? error.message : 'Error desconocido'
        alert('No se puedo registrar la inscripcion a ' + actividad + '. Error: ' + message)
      }
    }
  }


  const eliminarRegistroActividad = async (nroActividad: number, actividad: string) => {
    const isConfirmado = confirm('¿Desea eliminar ' + actividad + ' del registro de inscripciones del alumno?')

    if (isConfirmado) {
      try {
        await deleteByAlumnoAndActividad(Number(id), nroActividad)
        alert('Se quitó la inscripion a ' + actividad)
        establecerEstadoActividad(nroActividad, false)

        router.refresh()
      } catch (error: unknown) {
        const message = error instanceof Error ? error.message : 'Error desconocido'
        alert('No se pudo eliminar la inscripcion a ' + actividad + '. Error: ' + message)
      }
    }
  }


  function establecerEstadoActividad(id: number, estado: boolean) {
    setActividades(prev => prev.map((actividad) => {
      if (actividad.id === id){
        return { ...actividad, registrado: estado }
      }
      return actividad
    }))
  }


  return (
    <>
      <div className='container text-center' style={{ marginTop: '200px' }} >
        <div className='row justify-content-md-center'>
          <div className='col col-sm-5' >
            <div className="card border border-primary-subtle">
              <h5 className="card-header">Registrar información del alumno</h5>
              <ul className="list-group list-group-flush mt-2">
                <li className="list-group-item">
                  <div className="row g-3 align-items-center">
                    <div className="col-3">
                      <label htmlFor="nombre" className="col-form-label">Nombre</label>
                    </div>
                    <div className="col-8">
                      <input type="text" value={alumno.nombre} name='nombre' onChange={onChangeAlumno} className="form-control" id="nombre" placeholder="Ingrese nombre.." />
                    </div>
                  </div>
                </li>
                <li className="list-group-item">
                  <div className="row g-3 align-items-center">
                    <div className="col-3">
                      <label htmlFor="apellido" className="col-form-label">Apellido</label>
                    </div>
                    <div className="col-8">
                      <input type="text" value={alumno.apellido} onChange={onChangeAlumno} className="form-control" id="apellido" name='apellido' placeholder="Ingrese apellido.." />
                    </div>
                  </div>
                </li>
                <li className="list-group-item">
                  <div className="row g-3 align-items-center">
                    <div className="col-3">
                      <label htmlFor="dni" className="col-form-label">DNI</label>
                    </div>
                    <div className="col-8">
                      <input type="text" value={alumno.dni} onChange={onChangeAlumno} className="form-control" id="dni" name='dni' placeholder="Ingrese dni.." />
                    </div>
                  </div>
                </li>
              </ul>
              <div className="card-body">
                <button type="button" onClick={onClickGuardar} className="btn btn-primary ms-4">Guardar</button>
                <Link href={'/inscriptos'} replace>
                  <button type="button" className="btn btn-danger ms-4">Cancelar</button>
                </Link>
              </div>
            </div>
          </div>

          {params.id ?
            <div className='col col-sm-4'>
              <div className="card border border-primary-subtle">
                <h5 className="card-header">Actividades del gimnasio</h5>
                <div className="list-group list-group-flush">
                  {actividades.map(({ id, descripcion, registrado }) =>
                    <div key={id} className="form-check my-2 ms-3 mt-4">
                      <label className="form-check-label" htmlFor="flexCheckChecked">{descripcion}</label>
                      {registrado ?
                        (<button className="btn btn-danger ms-3" onClick={() => eliminarRegistroActividad(id, descripcion)}><i className="bi bi-x-circle"></i><span className='ms-2 font-monospace'>Eliminar</span></button>) :
                        (<button className="btn btn-success ms-3" onClick={() => registrarActividad(id, descripcion)}><i className="bi bi-check2-all"></i><span className='ms-2 font-monospace'>Inscribir</span></button>)
                      }
                    </div>
                  )}
                </div>
              </div>
            </div>
            : ''}
        </div>
      </div>
    </>
  )
}

export default FormRegistro