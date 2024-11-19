import { NextResponse, NextRequest } from "next/server";
import { prisma } from "@/libs/prisma";
import type { NextApiRequest, NextApiResponse } from 'next'

interface Params {
    params: { id: string }
}

export async function DELETE(request: NextRequest, { params }: Params) {

    const idActividad = request.nextUrl.searchParams.get('actividad')
    try {
        const { count } = await prisma.inscripcion.deleteMany({
            where: {
                alumnoID: Number(params.id),
                actividadId: Number(idActividad)
            },
        })
        return NextResponse.json({ status: (count == 0 ? 200 : 204) })
    } catch (error: any) {
        console.log(error)
        return NextResponse.json({ error: error.message })
    }
}