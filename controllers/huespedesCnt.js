const conn = require('../db/config')    //trae la conexion

// Obtener todos los empleados
exports.getHuespedes = (req, res)=>{
    conn.query('SELECT * FROM huespedes', (err,rows)=>{
        if (err) throw err
        res.json(rows)
    })
}


// Obtener un unico empleado
exports.getHuesped = (req, res)=>{
    const {dni} = req.params
    conn.query('SELECT * FROM huespedes WHERE documento_identidad = ?',[dni], (err,rows)=>{
        if (err) throw err
        res.json(rows)
    })
}

// Crear/insertar un huesped
exports.createHuesped = (req, res)=>{
    const {nombre,apellido,documento_identidad,telefono,correo,direccion} = req.body
    conn.query('INSERT INTO huespedes (nombre,apellido,documento_identidad,telefono,correo,direccion) VALUES (?,?,?,?,?,?)',[nombre,apellido,documento_identidad,telefono,correo,direccion], (err,result)=>{
        if (err) throw err
        res.json({message:`Huesped registrado`,
            id:result.insertId
        })
    })
}

// actualizar los datos de un huesped
exports.updateHuesped = (req, res)=>{
    const {dni} = req.params
    const {nombre,apellido,telefono,email,direccion} = req.body
    conn.query('UPDATE huespedes SET nombre = ?, apellido = ?, telefono = ?, correo = ?, direccion = ? WHERE documento_identidad = ?',[nombre,apellido,telefono,email,direccion,dni], (err,result)=>{
        if (err) throw err
        res.json({message:`Datos del huesped actulizados`,
            id:dni
        })
    })
}

// ELIMINAR A UN huesped
exports.deleteHesped = (req, res)=>{
    const {dni} = req.params
    conn.query('DELETE from huespedes WHERE documento_identidad = ?',[dni], (err,result)=>{
        if (err) throw err
        res.json({message:`Huesped eliminado`,
            id:dni
        })
    })
}

