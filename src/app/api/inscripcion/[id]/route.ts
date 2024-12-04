
import { NextResponse } from "next/server";
import { prisma } from "@/libs/prisma";


interface Params {
    params: { id: string }
}

export async function GET(request: Request, { params }: Params) {
    const inscripcion = await prisma.inscripcion.findUnique({
        where: {
            id: Number(params.id),
        },
        omit: {
            alumnoID: true,
            actividadId: true
        }, include:
        {
            alumno: true,
            actividad: true
        }
    })
    return NextResponse.json(inscripcion)
}

export async function PUT(request: Request, { params }: Params) {
    const { membresiaActiva, fecha, alumno, actividad } = await request.json()
    try {
        const inscripcion = await prisma.inscripcion.update({
            where: { id: Number(params.id) },
            data: {
                membresiaActiva,
                fecha,
                alumno: {
                    update: {
                        where: { id: alumno.id },
                        data: alumno
                    }
                },
                actividad: {
                    connect: {
                        id: actividad.id
                    }
                }
            },
            omit: {
                alumnoID: true,
                actividadId: true
            }, include:
            {
                alumno: true,
                actividad: true
            }
        })
        return NextResponse.json({ inscripcion, status: 201 })
    } catch (error: any) {
        return NextResponse.json({ message: error.message, status: 500 })
    }
}

export async function DELETE(request: Request, { params }: Params) {

    
    try {
        await prisma.inscripcion.delete({
            where: {
                id: Number(params.id),
            },
        })
        return NextResponse.json({ message: 'OK', status: 204 })
    } catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: 500 })
    }
}