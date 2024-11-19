import React, { useEffect, useState } from 'react'
import FormRegistro from './FormRegistro'
import ActividadesRegistradas from './ActividadesRegistradas'

const DetallesInscripto = ({id}: any) => {
  const [alumno,setAlumno] = useState<any>({})
 console.log('Renderizado')

  async function loadInformacionAlumno() {
    const response = await fetch(`/api/alumno/${id}`)
    const data = await response.json()
    setAlumno(data)
  }

  useEffect(() => {
     loadInformacionAlumno()
  }, []) 


  return (
    <div>
       <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="nombre" type="text" value={alumno.nombre} placeholder="Nombre" />
     {/*  <FormRegistro alumno={alumno}></FormRegistro> */}
      <ActividadesRegistradas inscripciones= {[{actividad:{id:1, descripcion: 'MUSCULACION'}}, {actividad:{id:2, descripcion: 'FITNNES'}}]}></ActividadesRegistradas> 
    </div>
  )
}

export default DetallesInscripto