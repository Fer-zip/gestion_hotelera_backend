const express = require('express')
const router = express.Router()
const reservas = require('../controllers/reservasCnt')

// rutas
// crear : post
// obtener : get
// eliminar : delete
// actualizar : put
router.get('/consultar/',reservas.getReservaConsulta); // colocado por orden de enrutado
router.get('/codigo/:codigo',reservas.getReservaPorCodigoConfirmacion); // colocado por orden de enrutado


router.get('/',reservas.getReservas);
router.get('/:idReserva',reservas.getReserva);
router.post('/',reservas.createReserva);
router.put('/:idReserva',reservas.updateReserva);

router.put('/cancelar/:idReserva',reservas.cancelReserva);
router.get('/detalles/:idReserva',reservas.getDetallesEspecificosReserva);
router.get('/cliente/:dni',reservas.getReservaPorDNICliente);


module.exports = router