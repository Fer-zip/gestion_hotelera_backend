const express = require('express')
const router = express.Router()
const empleados = require('../controllers/empleadosCnt')

// rutas
// crear : post
// obtener : get
// eliminar : delete
// actualizar : put

router.get('/',empleados.getEmpleados);
router.get('/:dni',empleados.getEmpleado);
router.put('/:dni',empleados.updateEmpleado);
router.delete('/:dni',empleados.deleteEmpleado);
router.post('/',empleados.createEmpleado);

router.post('/login',empleados.processLogin);

module.exports = router