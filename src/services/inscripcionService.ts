
const headers = new Headers()
headers.append("Content-Type", "application/json")


export const findById = async (id: number) => {
    try {
        const response = await fetch(`/api/inscripcion/${id}`)
        const json = await response.json()
        return json
    } catch (error) {

    }
}


export const update = async (id: string, body: string) => {
    try {
        const response = await fetch(`/api/inscripcion/${id}`, { method: 'PUT', body, cache: 'no-store', headers })
        const json = await response.json()
        if (json.status != 201) {
            throw Error(json.message)
        }
        return json
    } catch (error: any) {
        throw error;
    }
}


export const inscribirActividad = async (idAlumno: number, idActividad: number) => {
    try {
        const response = await fetch('/api/inscripcion/',
             { method: 'POST',
               body: JSON.stringify({idAlumno, idActividad}),
               cache: 'no-store',
               headers })

        const json = await response.json()
        if (json.status != 204) {
            throw Error(json.message)
        }
        return json
    } catch (error: any) {
        throw error
    }
}


export const deleteById = async (id: number) => {
    try {
        const response = await fetch(`/api/inscripcion/${id}`, { method: 'DELETE' })
        const json = await response.json()

        if (json.status != 204) {
            throw Error(json.message)
        }
        return json
    } catch (error) {
        throw error
    }
}


export const deleteByAlumnoAndActividad = async (idAlumno: number, idActividad: number) => {
    console.log(idAlumno)
    try {
        const response = await fetch(`/api/inscripcion/alumnos/${idAlumno}?actividad=${idActividad}`, { method: 'DELETE' })
        const json = await response.json()

        if (json.status != 204) {
            throw Error(json.message)
        }
        return json
    } catch (error) {
        throw error
    }
}


