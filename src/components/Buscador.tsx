import React from 'react'
import { useRouter } from 'next/navigation'



const Buscador = ({setInscriptos}: any) => {

    const router = useRouter()

    const onSubmitBuscar = (e: any) => {
        e.preventDefault()
        const busqueda = e.target.descripcion.value
        fetch(`/api/alumno?busqueda=${busqueda}`).then(response => response.json()).then(data => setInscriptos(data));
    
    }


    return (
        <form onSubmit={onSubmitBuscar}>
            <div className="input-group  px-3">
                <input type="text" className="form-control" name='descripcion' placeholder="" aria-label="" aria-describedby="basic-addon1" />
                <div className="input-group-prepend">
                    <button className="btn btn-outline-secondary" type="submit">Buscar</button>
                </div>
            </div>
        </form>
    )
}

export default Buscador