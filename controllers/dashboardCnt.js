const conn = require('../db/config')    //trae la conexion

exports.getDashboardStats = (req, res) => {
    const query = `
        SELECT 
            -- Ganancias del mes actual
            (SELECT IFNULL(SUM(monto), 0) 
             FROM pagos 
             WHERE MONTH(fecha_pago) = MONTH(CURDATE()) 
             AND YEAR(fecha_pago) = YEAR(CURDATE())
            ) AS ganancias_mes,
            
            -- Número de empleados registrados
            (SELECT COUNT(*) FROM empleados) AS usuarios_registrados,
            
            -- Número de reservas realizadas
            (SELECT COUNT(*) FROM reservas) AS reservas_realizadas,
            
            -- Número de huéspedes
            (SELECT COUNT(*) FROM huespedes) AS clientes_registrados,
            
            -- Cliente con más reservas
            (SELECT CONCAT(h.nombre, ' ', h.apellido)
             FROM huespedes h
             JOIN reservas r ON h.id_huesped = r.id_huesped
             GROUP BY h.id_huesped
             ORDER BY COUNT(r.id_reserva) DESC
             LIMIT 1
            ) AS cliente_top,
            
            -- Número de reservas que tiene el cliente top
            (SELECT COUNT(r.id_reserva)
             FROM reservas r
             WHERE r.id_huesped = (
                 SELECT h.id_huesped
                 FROM huespedes h
                 JOIN reservas r ON h.id_huesped = r.id_huesped
                 GROUP BY h.id_huesped
                 ORDER BY COUNT(r.id_reserva) DESC
                 LIMIT 1
             )
            ) AS reservas_cliente_top
    `;

    conn.query(query, (err, rows) => {
        if (err) throw err;
        res.json(rows[0]);
    });
};
