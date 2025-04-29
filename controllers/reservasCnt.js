const pool = require('../db/config');

// obtener todas las reservas
exports.getReservas = (req,res)=>{
    pool.query('SELECT * from reservas',(err,rows)=>{
        if (err) throw err
        res.json(rows)
    })
}

// obtener un reserva unica 
exports.getReserva = (req,res)=>{
    const {idReserva} = req.params
    pool.query('SELECT * from reservas WHERE id_reserva = ?',[idReserva],(err,rows)=>{
        if (err) throw err
        res.json(rows)
    })
}

// Crear un reserva
exports.createReserva = (req, res)=>{
    const {id_huesped,fecha_inicio,fecha_fin,estado,tipo_habitacion} = req.body
    pool.query('INSERT INTO reservas (id_huesped,fecha_inicio,fecha_fin,estado,tipo_habitacion) VALUES (?,?,?,?,?)',[id_huesped,fecha_inicio,fecha_fin,estado,tipo_habitacion], (err,result)=>{
        if (err) throw err
        res.json({message:`Reserva hecha por el huesped`,
            idHuesped:id_huesped,
            idReserva:result.insertId
        })
    })
}

// actualizar los datos de una reserva
exports.updateReserva = (req, res)=>{
    const {idReserva} = req.params
    const {fecha_inicio,fecha_fin,estado} = req.body
    pool.query('UPDATE reservas SET fecha_inicio = ?, fecha_fin = ?, estado = ? WHERE id_reserva = ?',[fecha_inicio,fecha_fin,estado,idReserva], (err,result)=>{
        if (err) throw err
        res.json({message:`Datos de la reserva actulizados`,
            id:result.insertId
        })
    })
}

//  ENDPOINT PARA CANCELAR RESERVAS
exports.cancelReserva = (req, res)=>{
    const {idReserva} = req.params
    pool.query('UPDATE reservas SET estado = "cancelada" WHERE id_reserva = ? ',[idReserva], (err,result)=>{
        if (err) throw err
        res.json({message:`Reserva cancelado`,
            id:idReserva
        })
    })
}

// ENDPOINT PARA VER LOS DETALLES ESPECIFICOS DE LA RESERVA SEGUN EL FRONT (usar tmbien para el checkin - es igual xd)
exports.getDetallesEspecificosReserva = (req, res) => {
    const { idReserva } = req.params;
    const query = `
        SELECT 
            CONCAT(h.nombre, ' ', h.apellido) AS nombre_huesped,
            ha.tipo AS tipo_habitacion,
            p.monto AS monto_total,
            GROUP_CONCAT(s.nombre SEPARATOR ', ') AS servicios,
            r.fecha_inicio,
            r.fecha_fin
        FROM reservas r
        JOIN huespedes h ON r.id_huesped = h.id_huesped
        JOIN habitaciones_reserva hr ON r.id_reserva = hr.id_reserva
        JOIN habitaciones ha ON hr.id_habitacion = ha.id_habitacion
        LEFT JOIN pagos p ON r.id_reserva = p.id_reserva
        LEFT JOIN servicios_reserva sr ON r.id_reserva = sr.id_reserva
        LEFT JOIN servicios s ON sr.id_servicio = s.id_servicio
        WHERE r.id_reserva = ?
        GROUP BY r.id_reserva, ha.tipo;
    `;

    pool.query(query, [idReserva], (err, rows) => {
        if (err) throw err;
        res.json(rows);
    });
};

