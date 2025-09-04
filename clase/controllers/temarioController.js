const { getAll, add, update, patch, remove } = require("../models/TemarioModel");

function getTemario(req, res) {
    res.json(getAll());
}

function getTemaById(req, res) {
    const { id } = req.params;
    const temario = getAll();
    const tema = temario.find(t => t.id === parseInt(id));

    if (!tema) {
        return res.status(404).json({ mensaje: "Tema no encontrado" });
    }
    res.json(tema);
}

function addTema(req, res) {
    const { id, titulo, descripcion } = req.body;
    const nuevoTema = add(id, titulo, descripcion);
    res.json({ mensaje: "Tema agregado", tema: nuevoTema });
}

// PUT - reemplazar tema completo
function updateTema(req, res) {
    const { id } = req.params;
    const { titulo, descripcion } = req.body;
    const actualizado = update(id, titulo, descripcion);

    if (!actualizado) {
        return res.status(404).json({ mensaje: "Tema no encontrado" });
    }
    res.json({ mensaje: "Tema actualizado (PUT)", tema: actualizado });
}

function patchTema(req, res) {
    const { id } = req.params;
    const actualizado = patch(id, req.body);

    if (!actualizado) {
        return res.status(404).json({ mensaje: "Tema no encontrado" });
    }
    res.json({ mensaje: "Tema modificado parcialmente", tema: actualizado });
}

function deleteTema(req, res) {
    const { id } = req.params;
    const eliminado = remove(id);

    if (!eliminado) {
        return res.status(404).json({ mensaje: "Tema no encontrado" });
    }
    res.json({ mensaje: "Tema eliminado", tema: eliminado });
}

module.exports = { getTemario, getTemaById, addTema, updateTema, patchTema, deleteTema };
