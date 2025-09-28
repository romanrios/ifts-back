const TemarioModel = require("../models/TemarioModel");

// GET - listar todos
const getTemario = (req, res) => {
    res.json(TemarioModel.getAll());
};

// POST - agregar nuevo
const addTema = (req, res) => {
    const { id, titulo, descripcion } = req.body;
    const nuevoTema = TemarioModel.add(id, titulo, descripcion);
    res.status(201).json({
        mensaje: "Agregado",
        tema: nuevoTema
    });
};

// PUT - reemplazar tema completo
const updateTema = (req, res) => {
    const { id } = req.params;
    const { titulo, descripcion } = req.body;

    const actualizado = TemarioModel.update(id, titulo, descripcion);
    if (!actualizado) {
        return res.status(404).json({ mensaje: "Tema no encontrado" });
    }

    res.json({
        mensaje: "Tema actualizado (PUT)",
        tema: actualizado
    });
};

// PATCH - actualizar parcialmente
const patchTema = (req, res) => {
    const { id } = req.params;
    const campos = req.body;

    const actualizado = TemarioModel.patch(id, campos);
    if (!actualizado) {
        return res.status(404).json({ mensaje: "Tema no encontrado" });
    }

    res.json({
        mensaje: "Tema actualizado (PATCH)",
        tema: actualizado
    });
};

// DELETE - eliminar
const deleteTema = (req, res) => {
    const id = parseInt(req.params.id); // asegurar que sea número

    const eliminado = TemarioModel.remove(id);

    if (!eliminado) {
        return res.status(404).json({ mensaje: "Tema no encontrado" });
    }

    return res.status(200).json({
        mensaje: "Tema eliminado correctamente",
        tema: eliminado
    });
};
module.exports = { getTemario, addTema, updateTema, patchTema, deleteTema };
