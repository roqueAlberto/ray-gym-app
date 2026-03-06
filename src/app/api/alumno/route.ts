import { NextResponse, NextRequest } from "next/server";
import { prisma } from "@/libs/prisma";


export async function GET(request: NextRequest) {
    try {
        const parametro = request.nextUrl.searchParams.get('busqueda')
        let resultado;

        if (parametro != null) {
            resultado = await prisma.alumno.findMany({
                where: {
                    nombreCompleto: {
                        contains: parametro,
                    },
                }, include: {
                    inscripciones: true
                }
            })
        } else {
            resultado = await prisma.alumno.findMany({
                include: {
                    inscripciones: true
                },
            })
        }

        return NextResponse.json({ resultado, status: 200 })
    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : 'Error interno del servidor'
        return NextResponse.json({ error: message }, { status: 500 })
    }
}

export async function POST(request: Request) {
    const data = await request.json()
    try {
        const result = await prisma.alumno.create({ data })
        return NextResponse.json({ result, status: 201 }, { status: 201 })
    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : 'Error interno del servidor'
        return NextResponse.json({ message, status: 500 }, { status: 500 })
    }
}