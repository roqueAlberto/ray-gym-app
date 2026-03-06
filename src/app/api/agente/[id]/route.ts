import { NextResponse } from "next/server";
import { prisma } from "@/libs/prisma";

interface Params {
    params: { id: string }
}

export async function GET(request: Request, { params }: Params) {
    try {
        const agente = await prisma.agente.findUnique({
            where: {
                id: Number(params.id),
            },
        })
        return NextResponse.json(agente)
    } catch (error: any) {
        return NextResponse.json({ message: error.message, status: 500 })
    }
}

export async function PUT(request: Request, { params }: Params) {
    const data = await request.json()
    try {
        const agente = await prisma.agente.update({
            where: { id: Number(params.id) },
            data
        })
        return NextResponse.json({ agente, status: 201 })
    } catch (error: any) {
        return NextResponse.json({ message: error.message, status: 500 })
    }
}

export async function DELETE(request: Request, { params }: Params) {
    try {
        await prisma.agente.delete({
            where: {
                id: Number(params.id)
            },
        })
        return NextResponse.json({ message: 'OK', status: 204 })
    } catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: 500 })
    }
}
