import eventModelo from '../models/eventoModel.js';

async function mostrarEventos(req, res) {
  const eventos = await eventModelo.obtenerEventos();
  res.render('index', { titulo: 'Lista de Eventos', eventos });
}

function formularioNuevoEvento(req, res) {
  res.render('nuevo', { titulo: 'Nuevo Evento' });
}

async function guardarEvento(req, res) {
  const { titulo, fecha } = req.body;
  if (!titulo || !fecha) return res.status(400).send('Título y fecha son requeridos');
  await eventModelo.agregarEvento(titulo, fecha);
  res.redirect('/');
}

async function eliminarEvento(req, res) {
  const id = parseInt(req.params.id);
  await eventModelo.eliminarEventoPorId(id);
  res.redirect('/');
}

const eventosController = { mostrarEventos, formularioNuevoEvento, guardarEvento, eliminarEvento };
export default eventosController;
