const express = require('express')
const router = express.Router()
const habitaciones = require('../controllers/habitacionesCnt')

// rutas
// crear : post
// obtener : get
// eliminar : delete
// actualizar : put

router.get('/',habitaciones.getHabitaciones);
router.get('/:numero',habitaciones.getHabitacion);
router.post('/',habitaciones.createHabitacion);
router.put('/:numero',habitaciones.updateHabitacion);
router.delete('/:numero',habitaciones.deleteHabitacion);


module.exports = router