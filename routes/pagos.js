const express = require('express')
const router = express.Router()
const pagos = require('../controllers/pagoCnt')

// rutas
// crear : post
// obtener : get
// eliminar : delete
// actualizar : put

router.get('/',pagos.getAllPagos);
router.get('/:numero',pagos.getUniquePago);
router.post('/',pagos.createPago);
router.put('/:numero',pagos.updatePago);

module.exports = router