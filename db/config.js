const mysql = require('mysql2');
const dotenv = require('dotenv');

dotenv.config();

const isProduction = process.env.NODE_ENV === 'production';

const conn = isProduction
    ? mysql.createPool({  // en Railway o servidores
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        port: parseInt(process.env.DB_PORT),
        waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 0
    })
    : mysql.createConnection({  // en local
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        port: parseInt(process.env.DB_PORT)
    });

// Verificador si la conexión está hecha
conn.getConnection ? conn.getConnection((err, connection) => {
    if (err) {
        console.error('Error al conectar a la base de datos (pool):', err);
        process.exit(1);
    }
    console.log(`Conexión exitosa a ${process.env.DB_NAME} (producción)`);
    connection.release(); // liberamos
}) : conn.connect((err) => {
    if (err) {
        console.error('Error al conectar a la base de datos (local):', err);
        process.exit(1);
    }
    console.log(`Conexión exitosa a ${process.env.DB_NAME} (local)`);
});

module.exports = conn;
