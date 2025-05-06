const conn = require('../db/config')    //trae la conexion

exports.getAllCheckinCheckouts = (req,res)=>{
    conn.query('SELECT * FROM checkin_checkout',(err,rows)=>{
        if (err) throw err
        res.json(rows)
    })
}

exports.getUniqueCheckinCheckout = (req,res)=>{
    const {id_reserva} = req.params
    conn.query('SELECT * FROM checkin_checkout where id_reserva = ?',[id_reserva],(err,rows)=>{
        if (err) throw err
        res.json(rows)
    })
}

// Al crear la reserva se coloca una fecha automatica, igual para cuando es checkout
exports.createCheckinCheckout = (req, res)=>{
    const {id_reserva} = req.body
    conn.query('INSERT INTO checkin_checkout (id_reserva,checkin,checkout) VALUES (?,now(),"")',[id_reserva], (err,result)=>{
        if (err) throw err
        res.json({message:`Registro creado`,
            id_check:result.insertId,
            id_reserva:id_reserva
        })
    })
}

// En caso del checkout
exports.updateCheckinCheckout = (req, res)=>{
    const {id_reserva} = req.params
    conn.query('UPDATE checkin_checkout SET checkout=now()  WHERE id_reserva = ?',[id_reserva], (err,result)=>{
        if (err) throw err
        res.json({message:`Registro del check actulizados`,
            id_reserva:id_reserva
        })
    })
}