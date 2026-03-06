
const headers = new Headers()
headers.append("Content-Type", "application/json")

export const getAll = async () => {
    const response = await fetch('http://localhost:3000/api/alumno',{ cache:'no-store' })
    const data = await response.json()
    return data
}


export const update = async (id: string, alumno: Record<string, unknown>) => {
    const response = await fetch(`/api/alumno/${id}`, 
        { 
            method: 'PUT', 
            body: JSON.stringify(alumno), 
            cache: 'no-store', 
            headers 
        }
    )
    const data = await response.json()
    if (!response.ok) {
        throw new Error(data.message)
    }
}


export const save = async (alumno: Record<string, unknown>) => {
    const response = await fetch('/api/alumno', 
        { 
            method: 'POST', 
            body: JSON.stringify(alumno), 
            cache: 'no-store', 
            headers 
        }
    )
    const data = await response.json()
    if (!response.ok) {
        throw new Error(data.message)
    }
    return data.result
}


export const deleteById = async (id: number) => {
    const response = await fetch(`/api/alumno/${id}`, { method: 'DELETE'} )
    const json = await response.json()

    if (!response.ok) {
        throw new Error(json.message)
    }
    return json
}
