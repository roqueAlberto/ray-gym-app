
import mysql from 'mysql2/promise';

let connection: any

export const  createConnection = async () => {
  if(!connection){
    connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      database: process.env.DB_DATABASE,
      user: process.env.DB_USER,
      password: process.env.DB_PASS,
      port: 3306
    });
  }
  return connection
   

}


