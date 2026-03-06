
import React, { Suspense } from 'react'
import Loading from './loading'
import ListaAgentes from '@/components/ListaAgentes'
import { getAll } from '@/services/agenteService'


export default async function AgentesPage() {
  const agentes = await getAll()
  return (
    <Suspense fallback={<Loading />}>
      <ListaAgentes agentes={agentes} />
    </Suspense>
  )
}
