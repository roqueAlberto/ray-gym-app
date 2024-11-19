import { Alumno } from "@prisma/client"

const headers = new Headers()
headers.append("Content-Type", "application/json")

export const getAll = async () => {
    try {
        const response = await fetch('/api/alumno')
        const json = await response.json()
        return json
    } catch (error) {
        throw error
    }
}



export const actualizarDatosPersonales = async (id: string, alumno: Object) => {
    try {
        const response = await fetch(`/api/alumno/${id}`, 
            { 
                method: 'PUT', 
                body: JSON.stringify(alumno), 
                cache: 'no-store', 
                headers 
            }
        )
        const json = await response.json()
        if (json.status != 201) {
            throw Error(json.message)
        }
        return json
    } catch (error: any) {
        throw error;
    }
}


export const registrar = async (alumno: Object) => {
    try {
        const response = await fetch('/api/alumno', 
            { 
                method: 'POST', 
                body: JSON.stringify(alumno), 
                cache: 'no-store', 
                headers 
            }
        )
        const data = await response.json()
        if (data.status != 201) {
            throw Error(data.message)
        }
        return data.result
    } catch (error: any) {
        throw error;
    }
}
