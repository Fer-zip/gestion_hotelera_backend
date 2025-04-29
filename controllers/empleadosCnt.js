const pool = require('../db/config')    //trae la conexion

// Proceso de login
exports.processLogin = (req, res)=>{
    const {correo_admin, pass_admin} = req.body
    pool.query(`SELECT * FROM empleados WHERE correo = ? AND contraseña= ?`, [correo_admin,pass_admin], (err,rows)=>{
        if (err) throw err
        rows[0] ? res.json(rows) : res.json({ mensaje: 'Error usuario no encontrado' });
    })
}


// Crear un empleado
exports.createEmpleado = (req, res)=>{
    const {dni, nombre,apellido,cargo,telefono,email,contra,fecha_contratacion} = req.body
    pool.query('INSERT INTO empleados (dni,nombre,apellido,cargo,telefono,correo,contraseña,fecha_contratacion) VALUES (?,?,?,?,?,?,?,?)',[dni,nombre,apellido,cargo,telefono,email,contra,fecha_contratacion], (err,result)=>{
        if (err) throw err
        res.json({message:`Empleado registrado`,
            id:result.insertId
        })
    })
}

// actualizar los datos de un empleado
exports.updateEmpleado = (req, res)=>{
    const {dni} = req.params
    const {nombre,apellido,cargo,telefono,email,contra,fecha_contratacion} = req.body
    pool.query('UPDATE empleados SET nombre = ?, apellido = ?, cargo = ?, telefono = ?, correo = ?, contraseña = ?, fecha_contratacion = ? WHERE dni = ?',[nombre,apellido,cargo,telefono,email,contra,fecha_contratacion,dni], (err,result)=>{
        if (err) throw err
        res.json({message:`Datos del empleado actulizados`,
            id:dni
        })
    })
}

// ELIMINAR A UN EMPLEADO
exports.deleteEmpleado = (req, res)=>{
    const {dni} = req.params
    pool.query('DELETE from empleados WHERE dni = ?',[dni], (err,result)=>{
        if (err) throw err
        res.json({message:`Empleado eliminado`,
            id:dni
        })
    })
}

// Obtener todos los empleados
exports.getEmpleados = (req, res)=>{
    pool.query('SELECT * FROM empleados', (err,rows)=>{
        if (err) throw err
        res.json(rows)
    })
}


// Obtener un unico empleado
exports.getEmpleado = (req, res)=>{
    const {dni} = req.params
    pool.query('SELECT * FROM empleados WHERE dni = ?',[dni], (err,rows)=>{
        if (err) throw err
        res.json(rows)
    })
}