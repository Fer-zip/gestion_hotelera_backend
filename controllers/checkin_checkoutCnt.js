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

exports.createCheckinCheckout = (req, res)=>{
    const {id_reserva,checkin,checkout} = req.body
    conn.query('INSERT INTO checkin_checkout (id_reserva,checkin,checkout) VALUES (?,?,?)',[id_reserva,checkin,checkout], (err,result)=>{
        if (err) throw err
        res.json({message:`Registro creado`,
            id_check:result.insertId,
            id_reserva:id_reserva
        })
    })
}


exports.updateCheckinCheckout = (req, res)=>{
    const {id_reserva} = req.params
    const {checkin,checkout} = req.body
    conn.query('UPDATE checkin_checkout SET checkin = ?, checkout = ?  WHERE id_reserva = ?',[checkin,checkout, id_reserva], (err,result)=>{
        if (err) throw err
        res.json({message:`Registro del check actulizados`,
            id_reserva:id_reserva
        })
    })
}