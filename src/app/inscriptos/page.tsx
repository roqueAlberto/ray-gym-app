

import React, { Suspense } from 'react'
import Loading from './loading'
import ListaAlumnos from '@/components/ListaAlumnos'
import { getAll } from '@/services/alumnoService'


export default async function InscriptosPage() {
  const inscriptos = await getAll()
  return (
    <Suspense fallback={<Loading />}>
      <ListaAlumnos alumnos={inscriptos} />
    </Suspense>
  )
}