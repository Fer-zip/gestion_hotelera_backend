const express = require('express')
const router = express.Router()
const servicioReservas = require('../controllers/servicioReservaCtn')

// rutas
// crear : post
// obtener : get
// eliminar : delete
// actualizar : put

router.get('/',servicioReservas.getAllServiciosReservas);
router.get('/:id_reserva',servicioReservas.getUniqueServicioReserva);
router.post('/',servicioReservas.createServicioReserva);
router.put('/:id',servicioReservas.updateServicioReserva);

module.exports = router