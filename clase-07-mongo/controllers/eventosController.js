// Importamos el modelo que maneja los datos de eventos (MongoDB)
import eventModelo from '../models/eventoModel.js';

// Controlador para mostrar la lista de eventos
async function mostrarEventos(req, res) {
  try {
    const eventos = await eventModelo.obtenerEventos();
    res.render('index', { titulo: 'Lista de Eventos', eventos });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al obtener eventos');
  }
}

// Controlador que muestra el formulario para crear un nuevo evento
function formularioNuevoEvento(req, res) {
  res.render('nuevo', { titulo: 'Nuevo Evento' });
}

// Controlador que guarda un nuevo evento enviado desde el formulario
async function guardarEvento(req, res) {
  try {
    const { titulo, fecha } = req.body;
    if (!titulo || !fecha) return res.status(400).send('Título y fecha son requeridos');

    await eventModelo.agregarEvento(titulo, fecha);
    res.redirect('/');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al guardar evento');
  }
}

// Controlador que elimina un evento según su ID
async function eliminarEvento(req, res) {
  try {
    const { id } = req.params; // ahora es un ObjectId (string)
    await eventModelo.eliminarEventoPorId(id);
    res.redirect('/');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al eliminar evento');
  }
}

// Agrupamos todas las funciones en un objeto
const eventosController = {
  mostrarEventos,
  formularioNuevoEvento,
  guardarEvento,
  eliminarEvento
};

export default eventosController;
