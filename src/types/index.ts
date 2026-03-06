export interface Actividad {
  id: number;
  descripcion: string;
  registrado: boolean;
}

export interface Alumno {
  nombre: string;
  apellido: string;
  dni: string;
}

export interface AlumnoRegistro extends Alumno {
  nombreCompleto: string;
  dni: number;
}

export interface AlumnoConInscripciones {
  id: number;
  nombre: string;
  apellido: string;
  dni: number;
  nombreCompleto: string;
  inscripciones: InscripcionDetalle[];
}

export interface InscripcionDetalle {
  id: number;
  membresiaActiva: boolean;
  fecha: string;
  actividad: Actividad;
}
