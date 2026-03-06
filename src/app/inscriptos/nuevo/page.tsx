import FormRegistro from '@/components/FormRegistro'
import React from 'react'


const NuevoPage = ({ params, }: { params: { id: string } }) => {
    return (
        <FormRegistro params={params} />
    )
}

export default NuevoPage



