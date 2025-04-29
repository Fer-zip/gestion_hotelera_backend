const express = require('express')
const router = express.Router()
const dashboard = require('../controllers/dashboardCnt')

// rutas
// crear : post
// obtener : get
// eliminar : delete
// actualizar : put

router.get('/',dashboard.getDashboardStats);


module.exports = router