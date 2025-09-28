import { readFile, writeFile } from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

// Ruta del archivo JSON
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const filePath = path.join(__dirname, '../data/eventos.json');

async function obtenerEventos() {
  try {
    const data = await readFile(filePath, 'utf-8');
    return JSON.parse(data);
  } catch {
    return [];
  }
}

async function guardarEventos(eventos) {
  await writeFile(filePath, JSON.stringify(eventos, null, 2));
}

async function agregarEvento(titulo, fecha) {
  const eventos = await obtenerEventos();
  const nuevoEvento = {
    id: eventos.length ? eventos[eventos.length - 1].id + 1 : 1,
    titulo,
    fecha
  };
  eventos.push(nuevoEvento);
  await guardarEventos(eventos);
}

async function eliminarEventoPorId(id) {
  const eventos = await obtenerEventos();
  const actualizados = eventos.filter(e => e.id !== id);
  await guardarEventos(actualizados);
}

// Exportar todas las funciones como un objeto
const eventModelo = { obtenerEventos, agregarEvento, eliminarEventoPorId };
export default eventModelo;
