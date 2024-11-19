import FormRegistro from '@/components/FormRegistro'
import React, { Suspense } from 'react'


const NuevoPage = ({ params, }: { params: { id: string } }) => {
    return (
        <Suspense fallback={<p>Loading weather...</p>}>
            <FormRegistro params={params} />
        </Suspense>

    )
}

export default NuevoPage



