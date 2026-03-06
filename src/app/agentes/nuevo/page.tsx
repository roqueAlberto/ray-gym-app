import FormAgente from '@/components/FormAgente'
import React from 'react'


const NuevoAgentePage = ({ params, }: { params: { id: string } }) => {
    return (
        <FormAgente params={params} />
    )
}

export default NuevoAgentePage
