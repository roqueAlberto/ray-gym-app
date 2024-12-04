
import { NextResponse } from "next/server";
import { prisma } from "@/libs/prisma";


interface Params {
    params: { id: string }
}

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
    } catch (error: any) {
        console.log(error)
        return NextResponse.json({ error: error.message })
    }
}

export async function DELETE(request: Request, { params }: Params) {
    const {alumnoID, actividadId} = await request.json()
    try {
        await prisma.inscripcion.deleteMany({
            where: {
                alumnoID,
                actividadId
            },
        })
    
        return NextResponse.json({status: 204})
    } catch (error: any) {
        console.log(error)
        return NextResponse.json({ error: error.message })
    }
}

export async function POST(request: Request, { params }: Params) {

    const { idAlumno, idActividad } = await request.json()
    console.log(idAlumno, idActividad)

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
        return NextResponse.json({result, status: 204})

    } catch (error: any) {
        return NextResponse.json({ message: error.message, status: 500 })
    }
}
