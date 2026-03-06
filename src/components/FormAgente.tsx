'use client'

import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { update, save } from '@/services/agenteService'


const FormAgente = ({ params }: { params: { id: string } }) => {
  const { id } = params
  const [agente, setAgente] = useState({ nombre: '', apellido: '', dni: '' })

  const router = useRouter()

  useEffect(() => {
    if (id)
      fetch(`/api/agente/${id}`)
        .then(response => response.json())
        .then(data => {
          if (data) {
            const { nombre, apellido, dni } = data
            setAgente({ nombre, apellido, dni: String(dni) })
          }
        })
  }, [id])


  const onChangeAgente = ({ target }: any) => {
    const { name, value } = target
    setAgente({ ...agente, [name]: value })
  }


  const onClickGuardar = async () => {
    try {
      const nombreCompleto = agente.nombre.concat(' ').concat(agente.apellido)
      const registro = { ...agente, ['dni']: Number(agente.dni), nombreCompleto }

      if (params.id) {
        await update(params.id, registro)
        alert('Información actualizada correctamente')
      } else {
        const response = await save(registro)
        router.push(`/agentes/detalles/${response.id}`)
      }
    } catch (error: any) {
      alert('Ocurrió un error al realizar la acción. Mensaje de error: ' + error.message)
    }
  }


  return (
    <>
      <div className='container text-center' style={{ marginTop: '200px' }} >
        <div className='row justify-content-md-center'>
          <div className='col col-sm-5' >
            <div className="card border border-primary-subtle">
              <h5 className="card-header">Registrar información del agente</h5>
              <ul className="list-group list-group-flush mt-2">
                <li className="list-group-item">
                  <div className="row g-3 align-items-center">
                    <div className="col-3">
                      <label htmlFor="nombre" className="col-form-label">Nombre</label>
                    </div>
                    <div className="col-8">
                      <input type="text" value={agente.nombre} name='nombre' onChange={onChangeAgente} className="form-control" id="nombre" placeholder="Ingrese nombre.." />
                    </div>
                  </div>
                </li>
                <li className="list-group-item">
                  <div className="row g-3 align-items-center">
                    <div className="col-3">
                      <label htmlFor="apellido" className="col-form-label">Apellido</label>
                    </div>
                    <div className="col-8">
                      <input type="text" value={agente.apellido} onChange={onChangeAgente} className="form-control" id="apellido" name='apellido' placeholder="Ingrese apellido.." />
                    </div>
                  </div>
                </li>
                <li className="list-group-item">
                  <div className="row g-3 align-items-center">
                    <div className="col-3">
                      <label htmlFor="dni" className="col-form-label">DNI</label>
                    </div>
                    <div className="col-8">
                      <input type="text" value={agente.dni} onChange={onChangeAgente} className="form-control" id="dni" name='dni' placeholder="Ingrese dni.." />
                    </div>
                  </div>
                </li>
              </ul>
              <div className="card-body">
                <button type="button" onClick={onClickGuardar} className="btn btn-primary ms-4">Guardar</button>
                <Link href={'/agentes'} replace>
                  <button type="button" className="btn btn-danger ms-4">Cancelar</button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default FormAgente
