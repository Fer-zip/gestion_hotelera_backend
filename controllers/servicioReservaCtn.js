const pool = require('../db/config');

// obtener todas los servicios de las reservas
exports.getAllServiciosReservas = (req,res)=>{
    pool.query('SELECT * from servicios_reserva',(err,rows)=>{
        if (err) throw err
        res.json(rows)
    })
}

// obtener un unico servicio de la reserva
exports.getUniqueServicioReserva = (req,res)=>{
    const {id_reserva} = req.params
    pool.query('SELECT * from servicios_reserva WHERE id_reserva = ?',[id_reserva],(err,rows)=>{
        if (err) throw err
        res.json(rows)
    })
}

// Crea/inserta un nuevo servicio para la reserva
exports.createServicioReserva = (req, res)=>{
    const {id_reserva,id_servicio,cantidad} = req.body
    pool.query('INSERT INTO servicios_reserva (id_reserva,id_servicio,cantidad) VALUES (?,?,?)',[id_reserva,id_servicio,cantidad], (err,result)=>{
        if (err) throw err
        res.json({message:`Servicio preparado para agregar a la reserva`,
            idReserva:id_reserva
        })
    })
}

// actualizar los datos de una reserva
exports.updateServicioReserva = (req, res)=>{
    const {id} = req.params
    const {id_servicio,cantidad} = req.body
    pool.query('UPDATE servicios_reserva SET id_servicio = ?, cantidad = ? WHERE id = ?',[id_servicio,cantidad,id], (err,result)=>{
        if (err) throw err
        res.json({message:`Datos del servicio para la reserva actulizados`,
            id_servicioReserva:id
        })
    })
}
