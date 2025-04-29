const mysql = require('mysql2');
const dotenv = require('dotenv');

dotenv.config();

console.log(`🛜 Conectando a base de datos: ${process.env.DB_HOST}`);

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT || 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  connectTimeout: 10000, // 10 segundos
  keepAliveInitialDelay: 0,
  enableKeepAlive: true, // ¡esto evita que Railway cierre conexiones!
});

pool.on('connection', (connection) => {
  console.log('✅ Nuevo cliente MySQL conectado');
});

pool.on('error', (err) => {
  console.error('❌ Error inesperado en el pool', err);
});

module.exports = pool.promise();
