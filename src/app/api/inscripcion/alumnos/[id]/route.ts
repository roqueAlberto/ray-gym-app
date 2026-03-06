import { NextResponse, NextRequest } from "next/server";
import { prisma } from "@/libs/prisma";

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
    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : 'Error interno del servidor'
        return NextResponse.json({ error: message }, { status: 500 })
    }
}