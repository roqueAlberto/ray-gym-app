
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

export async function POST(request: Request, { params }: Params) {

    const { alumno, actividad } = await request.json()

    try {
        const result = await prisma.inscripcion.create({
            data: {
                membresiaActiva: true,
                fecha: new Date(),
                alumno: {
                    create:
                    {
                        nombre: alumno.nombre,
                        apellido: alumno.apellido,
                        dni: alumno.dni,
                        nombreCompleto: alumno.nombre + '' + alumno.apellido
                    }
                },
                actividad: {
                    connect: {
                        id: actividad.id
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




    /* 
    const { fecha, aptaMedica, activo, alumno, idActividad } = await request.json();
     const { nombre, apellido, dni, nombreCompleto } = alumno
    const connection = await createConnection();
     try {
         await connection.beginTransaction();
 
         const [resultAlumno] = await connection.query('INSERT INTO alumno SET ?', {
             nombre,
             apellido,
             dni,
             nombre_completo: nombreCompleto
         })
 
         const [resultInscripcion] = await connection.query('INSERT INTO inscripcion SET ?', {
             fecha,
             apta_medica: aptaMedica,
             activo,
             id_alumno: resultAlumno.insertId,
             id_actividad: idActividad
         })
 
         await connection.commit()
         return NextResponse.json({ id: resultInscripcion.insertId, fecha, aptaMedica, activo, alumno, idActividad }) */

}
