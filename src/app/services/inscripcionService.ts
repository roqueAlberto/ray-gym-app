
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


export const save = async (body: string) => {
    try {
        const response = await fetch('/api/inscripcion/', { method: 'POST', body, cache: 'no-store', headers })

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