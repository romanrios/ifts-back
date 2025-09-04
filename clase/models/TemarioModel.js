const temario = require("../data/temario");

// Obtener todos los ítems
function getAll() {
    return temario;
}

// Agregar nuevo tema
function add(id, titulo, descripcion) {
    const nuevoTema = { id: parseInt(id), titulo, descripcion };
    temario.push(nuevoTema);
    return nuevoTema;
}

// Actualizar tema completo (PUT)
function update(id, titulo, descripcion) {
    const index = temario.findIndex(t => t.id === parseInt(id));
    if (index === -1) return null;

    temario[index] = { id: parseInt(id), titulo, descripcion };
    return temario[index];
}

// Actualizar parcialmente un tema (PATCH)
function patch(id, datosParciales) {
    const index = temario.findIndex(t => t.id === parseInt(id));
    if (index === -1) return null;

    temario[index] = { ...temario[index], ...datosParciales };
    return temario[index];
}

// Eliminar tema (DELETE)
function remove(id) {
    const index = temario.findIndex(t => t.id === parseInt(id));
    if (index === -1) return null;

    const eliminado = temario.splice(index, 1);
    return eliminado[0];
}

module.exports = {
    getAll,
    add,
    update,
    patch,
    remove
};
