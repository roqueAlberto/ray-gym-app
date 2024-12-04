
const headers = new Headers()
headers.append("Content-Type", "application/json")

export const getAll = async () => {
    try {
        const response = await fetch('http://localhost:3000/api/alumno',{ cache:'no-store' })
        const data = await response.json()
        return data
    } catch (error) {
        throw error
    }
}


export const update = async (id: string, alumno: Object) => {
    try {
        const response = await fetch(`/api/alumno/${id}`, 
            { 
                method: 'PUT', 
                body: JSON.stringify(alumno), 
                cache: 'no-store', 
                headers 
            }
        )
        const data = await response.json()
        if (data.status != 201) {
            throw Error(data.message)
        }
    } catch (error: any) {
        throw error;
    }
}


export const save = async (alumno: Object) => {
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


export const deleteById = async (id: number) => {
    try {
        const response = await fetch(`/api/alumno/${id}`, { method: 'DELETE'} )
        const json = await response.json()

        if (json.status != 204) {
            throw Error(json.message)
        }
        return json
    } catch (error) {
        throw error
    }
}
