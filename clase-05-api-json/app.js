/*
API REST completa en Node.js con Express que use un archivo .json como base de datos 
Operaciones CRUD: GET, POST, PUT, PATCH, y DELETE. Recordar poner npm install para instalar el modulo de express
Ejemplo para probar 
Prueba las rutas con Thunder Client:
GET /usuarios
GET /usuarios/1
POST /usuarios --- body: { "nombre": "Lucía" }
PUT /usuarios/1
PATCH /usuarios/1
DELETE /usuarios/1
*/

// Importamos el módulo Express
const express = require('express');
// Importamos el módulo fs (File System) para leer/escribir archivos
const fs = require('fs'); // Inicializamos la app de Express
const app = express(); // Definimos el puerto en el que se ejecutará el servidor
const PORT = 3000;

// Middleware que se ejecuta antes de que se llegue a las rutas.para parsear cuerpos JSON
// Intercepta las solicitudes que tienen un cuerpo (body) 
// en formato JSON (por ejemplo, POST, PUT, o PATCH).
//Convierte ese JSON automáticamente en un objeto accesible a través de req.body.
app.use(express.json());
const DB_FILE = './db.json'; // Ruta del archivo JSON que simula nuestra "base de datos"

/* Función para leer datos del archivo JSON.
   Devuelve el contenido ya parseado como objeto JS */
const leerDatos = () => {
  const data = fs.readFileSync(DB_FILE, 'utf-8'); //'utf-8' es un formato estándar de codificación
  // de texto que puede representar casi todos los caracteres del mundo (letras, símbolos, emojis...).
  return JSON.parse(data);
};

/* Función para escribir datos al archivo JSON.
   Recibe un array de objetos JS y lo guarda como JSON formateado */
const escribirDatos = (data) => {
  fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2)); 
  //Convierte ese objeto JavaScript a un string (texto plano) válido en formato JSON.
  //De data, que incluye todas las propiedades y con 2 espacios para hacer un formato legible al JSON
};

/* ------------------- RUTAS ------------------- */

// GET /usuarios → devuelve todos los usuarios
app.get('/usuarios', (req, res) => {
  const usuarios = leerDatos();     // Leemos el archivo
  res.json(usuarios);               // Devolvemos los datos en JSON
});
// GET /usuarios/:id devuelve un usuario por ID
app.get('/usuarios/:id', (req, res) => {
    const usuarios = leerDatos();               // Leemos el archivo con los usuarios
    const id = parseInt(req.params.id);         // Obtenemos el ID de la URL y lo convertimos a número
    const usuario = usuarios.find(u => u.id === id);  // Buscamos el usuario con el ID
    if (!usuario) {                             // Si no se encuentra, devolvemos 404
      return res.status(404).send('Usuario no encontrado');
    }
    res.json(usuario);                          // Devolvemos el usuario encontrado en formato JSON
  });

// POST /usuarios → agrega un nuevo usuario
app.post('/usuarios', (req, res) => {
  const usuarios = leerDatos();     // Leemos los usuarios actuales
  const nuevo = {
    id: req.body.id,                 //tambien podemos usar Date.now() donde creamos un ID único usando timestamp
    nombre: req.body.nombre         // Tomamos el nombre enviado en el cuerpo
  };
  usuarios.push(nuevo);             // Agregamos el nuevo usuario
  escribirDatos(usuarios);         // Guardamos en el archivo
  res.status(201).json(nuevo);     // Respondemos con el nuevo usuario (código 201: creado)
});

// PUT /usuarios/:id  reemplaza completamente un usuario
app.put('/usuarios/:id', (req, res) => {
  const usuarios = leerDatos();                // Leemos los usuarios
  const id = parseInt(req.params.id);          // Obtenemos el ID de la URL y lo convertimos a número
  const index = usuarios.findIndex(u => u.id === id);  // Buscamos el índice del usuario

  if (index === -1)                            // Si no existe, devolvemos error 404
    return res.status(404).send('Usuario no encontrado');

  // Reemplazamos completamente el usuario con los nuevos datos
  usuarios[index] = { id, nombre: req.body.nombre };
  escribirDatos(usuarios);                    // Guardamos cambios
  res.json(usuarios[index]);                  // Devolvemos el usuario actualizado
});

// PATCH /usuarios/:id actualiza parcialmente un usuario
app.patch('/usuarios/:id', (req, res) => {
  const usuarios = leerDatos();               // Leemos los usuarios
  const id = parseInt(req.params.id);         // Obtenemos el ID de la URL
  const usuario = usuarios.find(u => u.id === id);  // Buscamos el usuario

  if (!usuario)                               // Si no se encuentra, devolvemos 404
    return res.status(404).send('Usuario no encontrado');

  Object.assign(usuario, req.body);           // Mezclamos los datos enviados con el usuario actual
  escribirDatos(usuarios);                    // Guardamos cambios
  res.json(usuario);                          // Devolvemos el usuario modificado
});

// DELETE /usuarios/:id elimina un usuario
app.delete('/usuarios/:id', (req, res) => {
  let usuarios = leerDatos();                 // Leemos los usuarios
  const id = parseInt(req.params.id);         // Obtenemos el ID
  const inicial = usuarios.length;            // Guardamos la cantidad inicial

  // Filtramos todos los usuarios excepto el que queremos eliminar
  usuarios = usuarios.filter(u => u.id !== id);

  if (usuarios.length === inicial)            // Si no se eliminó nadie, el ID no existía
    return res.status(404).send('Usuario no encontrado');

  escribirDatos(usuarios);                    // Guardamos los usuarios restantes
  res.sendStatus(204);                        // 204: Sin contenido (éxito sin respuesta)
});

// Iniciamos el servidor
app.listen(PORT, () => {
  console.log(`Servidor en http://localhost:${PORT}`);
});
