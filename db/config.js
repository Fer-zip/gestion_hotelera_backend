const mysql = require('mysql2');
const dotenv = require('dotenv');

dotenv.config();

const pool = mysql.createPool({
    host: process.env.DB_HOST, 
    user: process.env.DB_USER,                  
    password: process.env.DB_PASSWORD, 
    database: process.env.DB_NAME,             
    port: process.env.DB_PORT,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Manejador de reconexión
pool.on('error', (err) => {
    console.error('Error inesperado en la conexión a la base de datos:', err);
    if (err.code === 'PROTOCOL_CONNECTION_LOST') {
        console.log('Reconectando automáticamente...');
    } else {
        throw err;
    }
});

console.log(`Pool creado para ${process.env.DB_NAME}`);
module.exports = pool;
