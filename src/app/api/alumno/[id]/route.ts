
import { NextResponse } from "next/server";
import { URL_INSCRIPCION } from "@/utils/constants";
import { createConnection } from '@/libs/mysql'
import { prisma } from "@/libs/prisma";
import { Alumno } from "@/app/class/Alumno";

interface Params {
    params: { id: string }
}

export async function GET(request: Request, { params }: Params) {
    const inscripcion = await prisma.alumno.findUnique({
        where: {
            id: Number(params.id),
        }, include: {
            inscripciones: {
                select: {
                    id: true,
                    membresiaActiva: true,
                    fecha: true,
                    actividad: true
                }
            }
        }
    })
    return NextResponse.json(inscripcion)
}

export async function PUT(request: Request, { params }: Params) {
    const data = await request.json()
    console.log(data)
    try {
        const alumno = await prisma.alumno.update({
            where: { id: Number(params.id) },
            data
        })
        return NextResponse.json({ alumno, status: 201 })
    } catch (error: any) {
        return NextResponse.json({ message: error.message, status: 500 })
    }


}

export async function DELETE(request: Request, { params }: Params) {
    try {
        await prisma.alumno.delete({
            where: {
                id: Number(params.id),
                nombre:'sads'
            },
        })
        return NextResponse.json({ message: 'OK', status: 204 })
    } catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: 500 })
    }
}