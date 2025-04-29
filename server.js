const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

// Importar rutas
const empleadosRouter = require('./routes/empleados');
const habitacionesRouter = require('./routes/habitaciones');
const serviciosRouter = require('./routes/servicios');
const huespedesRouter = require('./routes/huespedes');
const reservasRouter = require('./routes/reservas');
const servicioReservaRouter = require('./routes/servicioReserva');
const habitacionReservarRouter = require('./routes/habitacionReserva');
const pagosRouter = require('./routes/pagos');
const checkin_checkoutRouter = require('./routes/checkin_checkout');
const dashboardRouter = require('./routes/dashboard');

// Importar la conexión a la base de datos
const pool = require('./db/config');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

// Ruta principal solo de testeo
app.get('/', (req, res) => {
    res.json({ mensaje: 'Servidor funcionando correctamente' });
});

// Rutas del proyecto
app.use('/empleados', empleadosRouter);
app.use('/habitaciones', habitacionesRouter);
app.use('/huespedes', huespedesRouter);
app.use('/servicios', serviciosRouter);
app.use('/reservas', reservasRouter);
app.use('/servicioReserva', servicioReservaRouter);
app.use('/habitacionReserva', habitacionReservarRouter);
app.use('/pagos', pagosRouter);
app.use('/check', checkin_checkoutRouter);
app.use('/dashboard', dashboardRouter);

// --- VERIFICAR CONEXIÓN A BASE DE DATOS ANTES DE ARRANCAR ---
pool.getConnection((err, connection) => {
    if (err) {
        console.error('Error al conectar a la base de datos:', err);
        process.exit(1); // Cierra si falla
    }
    console.log('Conexión establecida correctamente a la base de datos.');

    // Liberar conexión y arrancar servidor
    connection.release();

    app.listen(PORT, () => {
        console.log(`Servidor corriendo en el puerto ${PORT}`);
    });
});
