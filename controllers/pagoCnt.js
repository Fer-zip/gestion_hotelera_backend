const pool = require('../db/config')    //trae la conexion

exports.getAllPagos = (req,res)=>{
    pool.query('SELECT * FROM pagos',(err,rows)=>{
        if (err) throw err
        res.json(rows)
    })
}

exports.getUniquePago = (req,res)=>{
    const {id_reserva} = req.params
    pool.query('SELECT * FROM pagos where id_reserva = ?',[id_reserva],(err,rows)=>{
        if (err) throw err
        res.json(rows)
    })
}

// INSERT DE PAGO AUN POR DEFINIR (FALTA LA FUNCION QUE EJECUTE EL MONTO TOTAL)
exports.createPago = (req, res) => {
    const { id_reserva, metodo_pago, fecha_pago } = req.body;

    // Creamos la consulta calculando el monto real, por medio de la reserva
    const sqlMonto = `
        SELECT 
            (IFNULL(SUM(h.precio), 0) * DATEDIFF(r.fecha_fin, r.fecha_inicio)) +
            IFNULL((
                SELECT SUM(s.precio * sr.cantidad)
                FROM servicios_reserva sr
                JOIN servicios s ON sr.id_servicio = s.id_servicio
                WHERE sr.id_reserva = r.id_reserva
            ), 0) AS total_a_pagar
        FROM reservas r
        JOIN habitaciones_reserva hr ON hr.id_reserva = r.id_reserva
        JOIN habitaciones h ON h.id_habitacion = hr.id_habitacion
        WHERE r.id_reserva = ?
        GROUP BY r.id_reserva
    `;

    pool.query(sqlMonto, [id_reserva], (errMonto, resultsMonto) => {
        if (errMonto) throw errMonto;

        if (resultsMonto.length === 0) {
            return res.status(404).json({ message: 'Reserva no encontrada' });
        }

        const montoCalculado = resultsMonto[0].total_a_pagar;

        // insertamos recien el pago con monto total calculado
        const sqlInsertPago = `
            INSERT INTO pagos (id_reserva, monto, metodo_pago, fecha_pago)
            VALUES (?, ?, ?, ?)
        `;

        pool.query(sqlInsertPago, [id_reserva, montoCalculado, metodo_pago, fecha_pago], (errInsert, result) => {
            if (errInsert) throw errInsert;

            res.json({
                message: 'Pago realizado correctamente',
                id_pago: result.insertId,
                id_reserva: id_reserva,
                monto_pagado: montoCalculado
            });
        });
    });
};



exports.updatePago = (req, res)=>{
    const {id_reserva} = req.params
    const {monto,metodo_pago,fecha_pago} = req.body
    pool.query('UPDATE pagos SET monto = ?, metodo_pago ?, fecha_pago = ? WHERE id_reserva = ?',[monto,metodo_pago,fecha_pago,id_reserva], (err,result)=>{
        if (err) throw err
        res.json({message:`Datos del pago actualizados actulizados`,
            id_reserva: id_reserva
        })
    })
}