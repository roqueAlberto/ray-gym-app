'use client'

import React, { act, useEffect, useState } from 'react'
import { actividades } from '@/utils/constants'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { update, inscribirActividad, deleteByAlumnoAndActividad } from '@/services/inscripcionService'
import { actualizarDatosPersonales, registrar } from '@/services/alumnoService'


interface Params {
  params: { id: string }
}

const FormRegistro = ({ params }: Params) => {
  const { id } = params
  const [nombre, setNombre] = useState('')
  const [apellido, setApellido] = useState('')
  const [nroDocumento, setNumeroDocumento] = useState('')
  const [musculacionInscripto, setMusculacionInscripto] = useState(false)
  const [crossfitInscripto, setCrossfitInscripto] = useState(false)
  const [funcionalInscripto, setFuncionalInscripto] = useState(false)

  const router = useRouter()


  async function loadInformacionAlumno() {
    const response = await fetch(`/api/alumno/${params.id}`)
    const { nombre, apellido, dni, inscripciones } = await response.json()
    setNombre(nombre)
    setApellido(apellido)
    setNumeroDocumento(dni)
    setMusculacionInscripto(inscripciones.some((inscripcion: any) => inscripcion.actividad.id == 1))
    setCrossfitInscripto(inscripciones.some((inscripcion: any) => inscripcion.actividad.id == 2))
    setFuncionalInscripto(inscripciones.some((inscripcion: any) => inscripcion.actividad.id == 3))
  }

  useEffect(() => {
    if (id)
      loadInformacionAlumno()
  }, [])


  const onClickGuardar = async (e: any) => {

    const dni = Number(nroDocumento)
    const nombreCompleto = nombre + ' ' + apellido
    const alumno = { nombre, apellido, dni, nombreCompleto }
    if (id) {
      try {
        await actualizarDatosPersonales(id, alumno)
        alert('Información actualizada correctamente')
      } catch (error: any) {
        alert('Error al actualizar informacion del alumno. ERROR: ' + error.message)
      }
    } else {
      try {
        const { id } = await registrar(alumno)
        router.push(`/inscriptos/detalles/${id}`)
      } catch (error: any) {
        alert('Error al registrar alumno: ' + error.message)
      }
    }
  }


  async function handlerInscripcionActividad(idActividad: number, actividad: string) {
    const aceptado = confirm('¿Desea inscribir al alumno a ' + actividad + '?')

    if (aceptado) {
      try {
        await inscribirActividad(Number(id), idActividad)
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
        await deleteByAlumnoAndActividad(Number(id), idActividad)
        alert('Se quitó la inscripion a ' + actividad )

        actualizarEstadoActividad(actividad, false)
      } catch (error: any) {
        alert('No se pudo eliminar la inscripcion a ' + actividad + '. Error: ' + error.message)
      }
    }
  }

  {/* function habilitarBotones(id: number): boolean {
    return inscripciones.some((inscripcion: any) => inscripcion.actividad.id == id)
  } */}

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
                      <input type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} className="form-control" id="nombre" placeholder="Ingrese nombre.." />
                    </div>
                  </div>
                </li>
                <li className="list-group-item">
                  <div className="row g-3 align-items-center">
                    <div className="col-3">
                      <label htmlFor="apellido" className="col-form-label">Apellido</label>
                    </div>
                    <div className="col-8">
                      <input type="text" value={apellido} onChange={(e) => setApellido(e.target.value)} className="form-control" id="apellido" placeholder="Ingrese apellido.." />
                    </div>
                  </div>
                </li>
                <li className="list-group-item">
                  <div className="row g-3 align-items-center">
                    <div className="col-3">
                      <label htmlFor="dni" className="col-form-label">DNI</label>
                    </div>
                    <div className="col-8">
                      <input type="text" value={nroDocumento} onChange={(e) => setNumeroDocumento(e.target.value)} className="form-control" id="dni" placeholder="Ingrese dni.." />
                    </div>
                  </div>
                </li>
              </ul>
              <div className="card-body">
                <button type="button" onClick={onClickGuardar} className="btn btn-primary ms-4">Guardar</button>
                <Link href={'/inscriptos'}>
                <button type="button" className="btn btn-danger ms-4">Cancelar</button>
                </Link>
               
              </div>
            </div>
          </div>

          {id ?
            <div className='col col-sm-4'>
              <div className="card border border-primary-subtle">
              <h5 className="card-header">Actividades del gimnasio</h5>

                <div className="list-group list-group-flush">
                  <div className="form-check my-2 ms-3 mt-4">
                    <label className="form-check-label" htmlFor="flexCheckChecked">MUSCULACION {musculacionInscripto ? <span>(inscripto)</span> : ''}</label>
                    {musculacionInscripto ? <button className="btn btn-danger ms-3" onClick={() => onEleminarInscripcionByActividad(1, 'MUSCULACION')}><i className="bi bi-x-circle"></i><span className='ms-2 font-monospace'>Eliminar</span></button> : <button className="btn btn-success ms-3" onClick={() => handlerInscripcionActividad(1, 'MUSCULACION')}><i className="bi bi-check2-all"></i><span className='ms-2 font-monospace'>Inscribir</span></button>}
                  </div>
                  <div className="form-check my-2 ms-3 mt-4">
                    <label className="form-check-label" htmlFor="flexCheckChecked">CROSSFIT {crossfitInscripto ? <span>(inscripto)</span> : ''}</label>
                    {crossfitInscripto ? <button className="btn btn-danger ms-3" onClick={() => onEleminarInscripcionByActividad(2, 'CROSSFIT')}><i className="bi bi-x-circle"></i><span className='ms-2 font-monospace'>Eliminar</span></button> : <button className="btn btn-success ms-3" onClick={() => handlerInscripcionActividad(2, 'CROSSFIT')}><i className="bi bi-check2-all"></i><span className='ms-2 font-monospace'>Inscribir</span></button>}
                  </div>
                  <div className="form-check my-2 ms-3 mt-4">
                    <label className="form-check-label" htmlFor="flexCheckChecked">FUNCIONAL {funcionalInscripto ? <span>(inscripto)</span> : ''}</label>
                    {funcionalInscripto ? <button className="btn btn-danger ms-3" onClick={() => onEleminarInscripcionByActividad(3, 'FUNCIONAL')}><i className="bi bi-x-circle"></i><span className='ms-2 font-monospace'>Eliminar</span></button> : <button className="btn btn-success ms-3" onClick={() => handlerInscripcionActividad(3, 'FUNCIONAL')}><i className="bi bi-check2-all"></i><span className='ms-2 font-monospace'>Inscribir</span></button>}
                  </div>
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