'use client'
import React from 'react'
import { useRouter } from 'next/navigation'
import { deleteById } from '@/services/agenteService'

const ListaAgentes = ({ agentes }: any) => {

    const router = useRouter()

    const onClickEliminarAgente = async (id: number) => {
        try {
            const isAceptado = confirm('¿Desea eliminar al agente del registro?')
            if (isAceptado) {
                await deleteById(id)
                alert('Registro del agente eliminado con éxito!')
                router.refresh()
            }
        } catch (error: any) {
            alert('Error al eliminar el agente: ' + error.message)
        }
    }

    return (
        <div className='container'>
            <div className='text-center p-10'>
                <h1 className='text-2xl font-bold my-4'>Agentes</h1>

                <div className='relative flex flex-col min-w-0 break-words w-full mb-6 mt-4'>
                    {agentes && agentes.length != 0 ?
                        <div className='block bg-transperant m-4 p-4 w-full overflow-x-auto'>
                            <table className="w-full table">
                                <thead className='thead-dark'>
                                    <tr className='border border-solid border-l-0 border-r-0'>
                                        <th className='text-md px-6 py-3'>Nombre</th>
                                        <th className='text-md px-6 py-3'>DNI</th>
                                        <th className='text-md px-6 py-3'>Acción</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {agentes.map((agente: any) => {
                                        return <tr key={agente.id} className='border border-solid border-l-0 border-r-0'>
                                            <th className='text-md px-6 py-3'>{agente.nombreCompleto}</th>
                                            <th className='text-md px-6 py-3'>{agente.dni}</th>
                                            <th>
                                                <button type="button" onClick={() => { router.push(`/agentes/detalles/${agente.id}`) }}
                                                    className="text-black btn btn-success text-sm px-5 py-2.5 text-center me-2 mb-2">Detalles</button>
                                                <button type="button" onClick={() => onClickEliminarAgente(agente.id)} className="text-white btn btn-danger text-sm px-5 py-2.5 text-center me-2 mb-2">Eliminar</button>
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

export default ListaAgentes
