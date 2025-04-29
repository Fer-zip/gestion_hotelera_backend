const conn = require('../db/config')    //trae la conexion

exports.getAllHabitacionesReserva = (req,res)=>{
    conn.query('SELECT * FROM habitaciones_reserva',(err,rows)=>{
        if (err) throw err
        res.json(rows)
    })
}

exports.getUniqueHabitacionReserva = (req,res)=>{
    const {id_reserva} = req.params
    conn.query('SELECT * FROM habitaciones_reserva where id_reserva = ?',[id_reserva],(err,rows)=>{
        if (err) throw err
        res.json(rows)
    })
}

exports.createHabitacionReserva = (req, res)=>{
    const {id_reserva,id_habitacion} = req.body
    conn.query('INSERT INTO habitaciones_reserva (id_reserva,id_habitacion) VALUES (?,?)',[id_reserva,id_habitacion], (err,result)=>{
        if (err) throw err
        res.json({message:`Habitacion reservada`,
            id_habitacionReserva:result.insertId,
            id_reserva:id_reserva
        })
    })
}


exports.updateHabitacionReserva = (req, res)=>{
    const {id_reserva} = req.params
    const {id_habitacion} = req.body
    conn.query('UPDATE habitaciones_reserva SET id_habitacion = ? WHERE id_reserva = ?',[id_habitacion, id_reserva], (err,result)=>{
        if (err) throw err
        res.json({message:`Datos de la reserva de la habitacion actulizados`,
            id_reserva:id_reserva
        })
    })
}