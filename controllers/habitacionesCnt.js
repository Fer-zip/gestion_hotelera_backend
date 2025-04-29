const conn = require('../db/config') 
 
// Obtener todas las habitaciones
exports.getHabitaciones = (req, res)=>{
    conn.query('SELECT * FROM habitaciones',(err,rows)=>{
        if (err) throw err
        res.json(rows)
    })
}

// Obtener una unica habitacion
exports.getHabitacion = (req, res)=>{
    const { numero } = req.params
    conn.query('SELECT * FROM habitaciones where numero = ?', [numero],(err,rows)=>{
        if (err) throw err
        res.json(rows)
    })
}

//  crear/insertar una habitacion
exports.createHabitacion = (req,res)=>{
    const {numero,tipo,descripcion,precio,piso,estado} = req.body
    conn.query('INSERT INTO habitaciones (numero,tipo,descripcion,precio,piso,estado) VALUES (?,?,?,?,?,?)',[numero,tipo,descripcion,precio,piso,estado],(err,result)=>{
        if (err) throw err
        res.json({
            message:`Nueva habitacion registrada`,
            id: result.insertId
        })
    })
}

// actualizar los datos de una habitacion
exports.updateHabitacion = (req,res)=>{
    const {numero} = req.params
    const {tipo,descripcion,precio,piso,estado} = req.body
    conn.query('UPDATE habitaciones SET tipo = ?, descripcion = ?, precio = ?, piso = ?, estado = ? WHERE numero = ?',[tipo,descripcion,precio,piso,estado,numero], (err,result)=>{
        if (err) throw err
        res.json({
            message:`Datos de la habitacion actulizados`,
            numero: numero
        })
    })
}

// eliminar una habitacion
exports.deleteHabitacion = (req,res)=>{
    const {numero} = req.params
    conn.query('DELETE from habitaciones where numero = ?',[numero],(err,result)=>{
        if (err) throw err
        res.json({
            message:`Habitacion eliminada`,
            numero: numero
        })
    })
}