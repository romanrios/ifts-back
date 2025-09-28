class TemarioModel {
    constructor() {
        this.temario = [
            { id: 1, titulo: "Intro Node JS", descripcion: "Comenzando" },
            { id: 2, titulo: "Módulos Node JS", descripcion: "Siguiendo" }
        ];
    }

    // Obtener todos los temas
    getAll() {
        return this.temario;
    }

    // Agregar nuevo tema
    add(id, titulo, descripcion) {
        const nuevoTema = { id: parseInt(id), titulo, descripcion };
        this.temario.push(nuevoTema);
        return nuevoTema;
    }

    // Actualizar tema completo (PUT)
    update(id, titulo, descripcion) {
        const index = this.temario.findIndex(t => t.id === parseInt(id));
        if (index === -1) return null;

        this.temario[index] = { id: parseInt(id), titulo, descripcion };
        return this.temario[index];
    }

    // Actualizar parcialmente (PATCH)
    patch(id, campos) {
        const index = this.temario.findIndex(t => t.id === parseInt(id));
        if (index === -1) return null;

        this.temario[index] = { ...this.temario[index], ...campos };
        return this.temario[index];
    }

    // Eliminar tema (DELETE)
    remove(id) {
        const index = this.temario.findIndex(t => t.id === parseInt(id));
        if (index === -1) return null;

        const eliminado = this.temario[index];
        this.temario.splice(index, 1);
        return eliminado;
    }
}

// Exportamos una instancia
module.exports = new TemarioModel();
