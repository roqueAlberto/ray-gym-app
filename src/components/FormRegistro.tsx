'use client'

import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { inscribirActividad, deleteByAlumnoAndActividad } from '@/services/inscripcionService'
import { update, save } from '@/services/alumnoService'
import {actividadesAlumno} from '@/utils/constants'


const FormRegistro = ({ params }: { params: { id: string } }) => {
  const { id } = params
  const [actividades, setActividades] = useState(actividadesAlumno)
  const [alumno, setAlumno] = useState({ nombre: '', apellido: '', dni: '' })

  const router = useRouter()

  useEffect(() => {
    if (id)
      fetch(`/api/alumno/${id}`)
        .then(response => response.json())
        .then(alumno => {
          const { nombre, apellido, dni, inscripciones } = alumno
          setAlumno({ nombre, apellido, dni })
          setActividades(actividades => actividades.map((actividad: any) => {
            actividad.registrado = inscripciones.some((inscripcion: any) => actividad.id == inscripcion.actividad.id)
            return actividad
          }))
        })
  }, [])


  const onChangeAlumno = ({ target }: any) => {
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
    } catch (error:any) {
      alert('Ocurrio un error al realizar la acción. Mensaje de error: ' + error.message)
    }
  }


  const registrarActividad = async (nroActividad: number, actividad: string) => {
    const isConfirmado = confirm('¿Desea inscribir al alumno a ' + actividad + '?')

    if (isConfirmado) {
      try {
        await inscribirActividad(Number(id), nroActividad)
        establecerEstadoActividad(nroActividad, true)

        alert('Se registro la inscripion a ' + actividad + ' con exito!!!')
        
      } catch (error: any) {
        alert('No se puedo registrar la inscripcion a ' + actividad + '. Error: ' + error.message)
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
      } catch (error: any) {
        alert('No se pudo eliminar la inscripcion a ' + actividad + '. Error: ' + error.message)
      }
    }
  }


  function establecerEstadoActividad(id: number, estado: boolean) {
    setActividades(actividades => actividades.map((actividad: any) => {
      if (actividad.id == id){
        actividad.registrado = estado
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
                    <div className="form-check my-2 ms-3 mt-4">
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