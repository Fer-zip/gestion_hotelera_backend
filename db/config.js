const mysql = require('mysql2');
const dotenv = require('dotenv');

dotenv.config();
console.log(process.env.DB_HOST);

const conn = mysql.createConnection({
    host: process.env.DB_HOST, 
    user: process.env.DB_USER,                  
    password: process.env.DB_PASSWORD, 
    database: process.env.DB_NAME,             
    port: process.env.DB_PORT                    
});

// Verificador si la conexión está hecha
conn.connect((err) => {
    if (err) {
        console.error('Error al conectar a la base de datos:', err);
        process.exit(1); // salir si hay error
    }
    console.log(`Conexión exitosa a ${process.env.DB_NAME}`);
});

module.exports = conn;const mysql = require('mysql2');
const dotenv = require('dotenv');

dotenv.config();
console.log(process.env.DB_HOST);

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

// Verificar el pool
pool.getConnection((err, connection) => {
    if (err) {
        console.error('❌ Error al conectar al pool:', err);
        process.exit(1);
    }
    console.log(`✅ Pool conectado a ${process.env.DB_NAME}`);
    connection.release(); // liberar para que el pool gestione
});

module.exports = pool;
