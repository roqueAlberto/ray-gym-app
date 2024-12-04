import { NextResponse, NextRequest } from "next/server";
import { prisma } from "@/libs/prisma";




export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
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
    } catch (error: any) {
        console.log(error)
        return NextResponse.json({ error: error.message })
    }
}

export async function POST(request: Request, { params }: { params: { id: string } }) {
    const data = await request.json()
    try {
        const result = await prisma.alumno.create({ data })
        return NextResponse.json({ result, status: 201 })
    } catch (error: any) {
        console.log(error)
        return NextResponse.json({ message: error.message, status: 500 })
    }


}