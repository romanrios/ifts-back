// Importamos Mongoose, que nos permite trabajar con MongoDB usando modelos y esquemas
import mongoose from 'mongoose';

// Definimos el esquema de la colección "eventos"
// Un esquema es la "plantilla" que describe qué campos tiene un documento y qué tipo de datos acepta
const eventoSchema = new mongoose.Schema({
  // Campo "titulo" → tipo String y obligatorio
  titulo: { type: String, required: true },
  // Campo "fecha" → tipo Date y obligatorio
  fecha: { type: Date, required: true }
});

// Creamos el modelo a partir del esquema
// "Evento" será la clase que representa a la colección "eventos" en MongoDB
// mongoose.model('Evento', eventoSchema) → automáticamente busca/crea la colección "eventos"
const Evento = mongoose.model('Evento', eventoSchema);

// Función: obtener todos los eventos
// Usamos Evento.find() para traer todos los documentos
// .lean() convierte los documentos de Mongoose en objetos planos de JavaScript (más rápidos y livianos)
async function obtenerEventos() {
  return await Evento.find().lean();
}

// Función: agregar un nuevo evento
// Creamos un nuevo objeto de tipo Evento con los datos recibidos y lo guardamos en la base de datos
async function agregarEvento(titulo, fecha) {
  const nuevoEvento = new Evento({ titulo, fecha }); // instancia del modelo
  return await nuevoEvento.save(); // guarda en la colección "eventos"
}

// Función: eliminar evento por ID
// Busca un documento por su _id y lo elimina
async function eliminarEventoPorId(id) {
  return await Evento.findByIdAndDelete(id);
}

// Exportamos las funciones agrupadas en un objeto
// Esto permite que otros archivos (como el controlador) importen y usen estas funciones
const eventModelo = {
  obtenerEventos,
  agregarEvento,
  eliminarEventoPorId
};

// Exportamos el objeto como default para poder importarlo en el controlador
export default eventModelo;
