
const headers = new Headers()
headers.append("Content-Type", "application/json")

export const getAll = async () => {
    try {
        const response = await fetch('http://localhost:3000/api/agente', { cache: 'no-store' })
        const data = await response.json()
        return data.resultado
    } catch (error) {
        throw error
    }
}


export const update = async (id: string, agente: object) => {
    try {
        const response = await fetch(`/api/agente/${id}`,
            {
                method: 'PUT',
                body: JSON.stringify(agente),
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


export const save = async (agente: object) => {
    try {
        const response = await fetch('/api/agente',
            {
                method: 'POST',
                body: JSON.stringify(agente),
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
        const response = await fetch(`/api/agente/${id}`, { method: 'DELETE' })
        const json = await response.json()

        if (json.status != 204) {
            throw Error(json.message)
        }
        return json
    } catch (error) {
        throw error
    }
}
