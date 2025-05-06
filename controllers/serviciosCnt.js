const conn = require('../db/config') 

// Obtener todos los servicios
exports.getServicios = (req, res)=>{
    conn.query('SELECT * from servicios',(err, rows)=>{
        if(err) throw err;
        res.json(rows)
    })
}

// Obtener un unico servicio
exports.getServicio = (req, res)=>{
    const { nombre } = req.params
    conn.query('SELECT * from servicios where nombre LIKE ?',[`%${nombre}%`],(err, rows)=>{
        if(err) throw err;
        res.json(rows)
    })
}

// crear/insertar un servicio
exports.createServicio = (req,res)=>{
    const {nombre,descripcion,precio} = req.body
    conn.query('INSERT INTO servicios (nombre,descripcion,precio) VALUES (?,?,?)',[nombre,descripcion,precio],(err,result)=>{
        if (err) throw err
        res.json({
            message:'Servicio nuevo registrado',
            id:result.insertId
        })
    })
}

// actualizar los datos de un servicio
exports.updateServicio = (req,res)=>{
    const {id} = req.params
    const {nombre,descripcion,precio} = req.body
    conn.query('UPDATE servicios SET nombre = ?, descripcion = ?, precio = ? WHERE id = ?',[nombre,descripcion,precio,id], (err,result)=>{
        if (err) throw err
        res.json({
            message:`Datos del servicio actulizados`,
            id: id
        })
    })
}

// borrar un servicio
exports.deleteServicio = (req,res)=>{
    const {id} = req.params
    conn.query('DELETE from servicios where id_servicio = ?',[id],(err,result)=>{
        if (err) throw err
        res.json({
            message:`Servicio eliminada`,
            id: id
        })
    })
}