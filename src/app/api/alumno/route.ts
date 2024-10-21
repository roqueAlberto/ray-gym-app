
import { NextResponse } from "next/server";
import {createConnection} from '@/libs/mysql'

interface Params {
    params: { id: string }
}


export async function POST(request: Request, { params }: Params) {

    const { nombre, apellido, dni } = await request.json();
    const nombreCompleto = `${nombre} ${apellido}`

    try {
        const [result, metadata]  = await (await createConnection()).query('INSERT INTO alumno SET ?', {
            nombre,
            apellido,
            dni,
            nombre_completo: nombreCompleto
        })

        const resultado: any = result;
        return NextResponse.json({ id: resultado.insertId, nombre, apellido, dni, nombreCompleto })
    } catch (error: any) {
        return NextResponse.json(
            { error: error.message },
            { status: 500 })
    }
}