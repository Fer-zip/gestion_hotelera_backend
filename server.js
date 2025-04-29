const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const empleadosRouter = require('./routes/empleados')
const habitacionesRouter = require('./routes/habitaciones')
const seriviciosRouter = require('./routes/servicios')
const huespedesRouter = require('./routes/huespedes')
const reservasRouter = require('./routes/reservas')
const servicioReservaRouter = require('./routes/servicioReserva')
const habitacionReservarRouter = require('./routes/habitacionReserva')
const pagosRouter = require('./routes/pagos')
const checkin_checkoutRouter = require('./routes/checkin_checkout')
const dashboardRouter = require('./routes/dashboard')

const app = express()
const PORT = 3000

app.use(cors())
app.use(bodyParser.json())

// Ruta principal solo de testeo
app.get('/', (req, res) => {
    res.json({ mensaje: 'Servidor funcionando correctamente' })
})

// Rutas del módulo empleados
app.use('/empleados', empleadosRouter)
app.use('/habitaciones', habitacionesRouter)
app.use('/huespedes', huespedesRouter)
app.use('/servicios', seriviciosRouter)
app.use('/reservas', reservasRouter)
app.use('/servicioReserva', servicioReservaRouter)
app.use('/habitacionReserva', habitacionReservarRouter)
app.use('/pagos',pagosRouter)
app.use('/check',checkin_checkoutRouter)
app.use('/dashboard',dashboardRouter)

// 
app.listen(PORT, () => {
    console.log(`Servidor corriendo correctamente`)
})
