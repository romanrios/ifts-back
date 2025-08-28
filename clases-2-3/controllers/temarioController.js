const Temario = require('../models/TemarioModel.js');
const temario = require('../data/temario');

function crearTemario(req, res) {
    const { id, titulo, descripcion } = req.body;
    const nuevoTemario = new Temario(id, titulo, descripcion);
    temario.push(nuevoTemario);

    res.json({ mensaje: "Temario creado", datos: nuevoTemario })
};

module.exports = { crearTemario };