
import { NextResponse } from "next/server";
import { prisma } from "@/libs/prisma";


export async function GET() {
    try {
        const inscripciones = await prisma.inscripcion.findMany({
            omit: {
                alumnoID: true,
                actividadId: true
            }, include: {
                alumno: true,
                actividad: true
            }
        })
    
        return NextResponse.json(inscripciones)
    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : 'Error interno del servidor'
        return NextResponse.json({ error: message }, { status: 500 })
    }
}

export async function DELETE(request: Request) {
    const {alumnoID, actividadId} = await request.json()
    try {
        await prisma.inscripcion.deleteMany({
            where: {
                alumnoID,
                actividadId
            },
        })
    
        return NextResponse.json({status: 204})
    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : 'Error interno del servidor'
        return NextResponse.json({ error: message }, { status: 500 })
    }
}

export async function POST(request: Request) {

    const { idAlumno, idActividad } = await request.json()

    try {
        const result = await prisma.inscripcion.create({
            data: {
                membresiaActiva: true,
                fecha: new Date(),
                alumno: {
                    connect: {
                        id: idAlumno
                    }
                },
                actividad: {
                    connect: {
                        id: idActividad
                    }
                }
            }, omit: {
                alumnoID: true,
                actividadId: true
            }, include:
            {
                alumno: true,
                actividad: true
            }
        })
        return NextResponse.json({result, status: 201}, { status: 201 })

    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : 'Error interno del servidor'
        return NextResponse.json({ message, status: 500 }, { status: 500 })
    }
}
