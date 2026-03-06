
const headers = new Headers()
headers.append("Content-Type", "application/json")


export const findById = async (id: number) => {
    const response = await fetch(`/api/inscripcion/${id}`)
    const json = await response.json()
    if (!response.ok) {
        throw new Error(json.message)
    }
    return json
}


export const update = async (id: string, body: string) => {
    const response = await fetch(`/api/inscripcion/${id}`, { method: 'PUT', body, cache: 'no-store', headers })
    const json = await response.json()
    if (!response.ok) {
        throw new Error(json.message)
    }
    return json
}


export const inscribirActividad = async (idAlumno: number, idActividad: number) => {
    const response = await fetch('/api/inscripcion/',
         { method: 'POST',
           body: JSON.stringify({idAlumno, idActividad}),
           cache: 'no-store',
           headers })

    const json = await response.json()
    if (!response.ok) {
        throw new Error(json.message)
    }
    return json
}


export const deleteById = async (id: number) => {
    const response = await fetch(`/api/inscripcion/${id}`, { method: 'DELETE' })
    const json = await response.json()

    if (!response.ok) {
        throw new Error(json.message)
    }
    return json
}


export const deleteByAlumnoAndActividad = async (idAlumno: number, idActividad: number) => {
    const response = await fetch(`/api/inscripcion/alumnos/${idAlumno}?actividad=${idActividad}`, { method: 'DELETE' })
    const json = await response.json()

    if (!response.ok) {
        throw new Error(json.message)
    }
    return json
}

