const express = require('express')
const router = express.Router()
const checkin_checkout = require('../controllers/checkin_checkoutCnt')

// rutas
// crear : post
// obtener : get
// eliminar : delete
// actualizar : put

router.get('/',checkin_checkout.getAllCheckinCheckouts);
router.get('/:id_reserva',checkin_checkout.getUniqueCheckinCheckout);
router.post('/',checkin_checkout.createCheckinCheckout);
router.put('/:id_reserva',checkin_checkout.updateCheckinCheckout);

module.exports = router