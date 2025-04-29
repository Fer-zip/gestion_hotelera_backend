const express = require('express')
const router = express.Router()
const habitacionesReserva = require('../controllers/habitacionesReservaCnt')

// rutas
// crear : post
// obtener : get
// eliminar : delete
// actualizar : put

router.get('/',habitacionesReserva.getAllHabitacionesReserva);
router.get('/:id_reserva',habitacionesReserva.getUniqueHabitacionReserva);
router.post('/',habitacionesReserva.createHabitacionReserva);
router.put('/:id_reserva',habitacionesReserva.updateHabitacionReserva);

module.exports = router