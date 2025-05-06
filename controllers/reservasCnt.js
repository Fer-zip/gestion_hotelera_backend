const conn = require('../db/config');

// obtener todas las reservas
exports.getReservas = (req,res)=>{
    conn.query('SELECT * from reservas',(err,rows)=>{
        if (err) throw err
        res.json(rows)
    })
}

// obtener un reserva unica 
exports.getReserva = (req,res)=>{
    const {idReserva} = req.params
    conn.query('SELECT * from reservas WHERE id_reserva = ?',[idReserva],(err,rows)=>{
        if (err) throw err
        res.json(rows)
    })
}

// Obtener acceso a reserva con datos importantes
exports.getReservaConsulta = (req,res)=>{
    const sql = `
    SELECT RESERVAS.id_reserva, 
		HUESPEDES.nombre,
		HUESPEDES.documento_identidad, 
		RESERVAS.fecha_inicio,
		RESERVAS.estado,
		RESERVAS.tipo_habitacion
    FROM RESERVAS       
    LEFT JOIN HUESPEDES ON Reservas.id_huesped=HUESPEDES.id_huesped
    `
    conn.query(sql,(err,rows)=>{
        if (err) throw err
        res.json(rows)
    })
}

// Crear un reserva
exports.createReserva = (req, res)=>{
    const {id_huesped,fecha_inicio,fecha_fin,estado,tipo_habitacion} = req.body
    conn.query('INSERT INTO reservas (id_huesped,fecha_inicio,fecha_fin,estado,tipo_habitacion) VALUES (?,?,?,?,?)',[id_huesped,fecha_inicio,fecha_fin,estado,tipo_habitacion], (err,result)=>{
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
    const {fecha_inicio,fecha_fin,tipo_habitacion,estado} = req.body
    conn.query('UPDATE reservas SET fecha_inicio = ?, fecha_fin = ?, estado = ?, tipo_habitacion=? WHERE id_reserva = ?',[fecha_inicio,fecha_fin,estado,tipo_habitacion,idReserva], (err,result)=>{
        if (err) throw err
        res.json({message:`Datos de la reserva actulizados`,
            id:result.insertId
        })
    })
}

//  ENDPOINT PARA CANCELAR RESERVAS
exports.cancelReserva = (req, res)=>{
    const {idReserva} = req.params
    conn.query('UPDATE reservas SET estado = "cancelada" WHERE id_reserva = ? ',[idReserva], (err,result)=>{
        if (err) throw err
        res.json({message:`Reserva cancelado`,
            id:idReserva
        })
    })
}

// ENDPOINT PARA OBTENER LA RESERVA POR MEDIO DE CÓDIGO DE CONFIRMACION
exports.getReservaPorCodigoConfirmacion = (req, res)=>{
    const {codigo} = req.params
    const sql = `
    SELECT RESERVAS.id_reserva, 
		HUESPEDES.nombre,
		HUESPEDES.documento_identidad, 
		RESERVAS.fecha_inicio,
		RESERVAS.estado,
		RESERVAS.tipo_habitacion,
        CONCAT(RESERVAS.id_reserva, HUESPEDES.documento_identidad) AS codigo
    FROM RESERVAS
    LEFT JOIN HUESPEDES ON Reservas.id_huesped=HUESPEDES.id_huesped
    WHERE CONCAT(RESERVAS.id_reserva, HUESPEDES.documento_identidad)=?;
    `
    conn.query(sql,[codigo], (err,result)=>{
        if (err) throw err
        res.json(result)
    })
}

// ENDPOINT PARA OBTENER LA RESERVA MAS RECIENTE 


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

    conn.query(query, [idReserva], (err, rows) => {
        if (err) throw err;
        res.json(rows);
    });
};

// Consulta de reservas según el DNI
exports.getReservaPorDNICliente = (req, res)=>{
    const {dni} = req.params
    const query = `
        SELECT RESERVAS.id_reserva, 
            HUESPEDES.nombre,
            HUESPEDES.documento_identidad, 
            RESERVAS.fecha_inicio,
            RESERVAS.estado,
            RESERVAS.tipo_habitacion
        FROM RESERVAS
        LEFT JOIN HUESPEDES ON Reservas.id_huesped=HUESPEDES.id_huesped
        WHERE HUESPEDES.documento_identidad=?;
    `;
    conn.query(query,[dni], (err,rows)=>{
        if (err) throw err
        res.json(rows)
    })
}

