import mysql from 'mysql2';
import dotenv from 'dotenv';

dotenv.config();

const db = mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'sistema_productividad',
    port: process.env.DB_PORT || 3307
});

db.connect((err) => {
    if (err) {
        console.error('Error al conectar con la base de datos:', err);
        return;
    }
    console.log('Conexión exitosa con la base de datos');
});

export default db;

