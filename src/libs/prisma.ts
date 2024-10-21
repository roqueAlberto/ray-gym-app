import { PrismaClient } from "@prisma/client";

// Sirve para crear una conexion con la db. Exporta un objeto que contiene la conexion con la db
export const prisma = new PrismaClient();