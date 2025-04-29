const express = require('express')
const router = express.Router()
const huespedes = require('../controllers/huespedesCnt')

// rutas
// crear : post
// obtener : get
// eliminar : delete
// actualizar : put

router.get('/',huespedes.getHuespedes);
router.get('/:dni',huespedes.getHuesped);
router.post('/',huespedes.createHuesped);
router.put('/:dni',huespedes.updateHuesped);
router.delete('/:dni',huespedes.deleteHesped);


module.exports = router