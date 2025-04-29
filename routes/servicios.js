const express = require('express')
const router = express.Router()
const servicios = require('../controllers/serviciosCnt')

// rutas
// crear : post
// obtener : get
// eliminar : delete
// actualizar : put

router.get('/',servicios.getServicios);
router.get('/:id',servicios.getServicio);
router.post('/',servicios.createServicio);
router.put('/:id',servicios.updateServicio);
router.delete('/:id',servicios.deleteServicio);


module.exports = router