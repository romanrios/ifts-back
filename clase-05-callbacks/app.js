/**
 * Ejemplo de servidor en Node.js que utiliza callbacks.
 * 
 * ¿Qué es un callback?
 * Un callback es una función que se pasa como argumento a otra función y 
 * se ejecuta después de que ocurre una tarea específica, generalmente 
 * una operación asíncrona. Es una forma de "esperar" a que algo termine 
 * antes de continuar con el siguiente paso.
 * 
 * Descripción del ejercicio:
 * Este servidor escucha en el puerto 3000 y responde a la ruta /procesar.
 * Cuando se accede a esta ruta, simula una tarea asíncrona que tarda un 
 * tiempo aleatorio (entre 1 y 4 segundos) usando setTimeout.
 * 
 * Utiliza un callback para manejar el resultado una vez que la tarea se completa,
 * y devuelve un mensaje con el tiempo que tardó la tarea.
 */

// Importamos el módulo HTTP de Node.js para poder crear un servidor web
const http = require('http');

// Definimos una función que simula una tarea asíncrona y recibe un callback como parámetro
function tareaAsincrona(callback) {
  // Generamos un número aleatorio entre 1000 y 4000 (milisegundos)
  const tiempo = Math.floor(Math.random() * 3000) + 1000;

  // Usamos setTimeout para simular que la tarea tarda cierto tiempo en completarse
  setTimeout(() => {
    // Creamos un mensaje que indica cuánto tiempo tardó la tarea
    const mensaje = `Tarea completada en ${tiempo}ms`;

    // Ejecutamos la función callback y le pasamos el mensaje generado
    callback(mensaje);
  }, tiempo); // Esperamos la cantidad de milisegundos generada
}

// Creamos un servidor HTTP que maneja las solicitudes entrantes
const servidor = http.createServer((req, res) => {
  // Verificamos si la URL de la solicitud es exactamente '/procesar'
  if (req.url === '/procesar') {
    // Llamamos a la función asíncrona y le pasamos un callback para manejar el resultado
    tareaAsincrona((resultado) => {
      // Respondemos al cliente con un código 200 (OK) y tipo de contenido texto plano
      res.writeHead(200, { 'Content-Type': 'text/plain' });

      // Enviamos el mensaje de resultado al cliente como respuesta
      res.end(resultado);
    });
  } else {
    // Si la URL no es /procesar, devolvemos una respuesta 404 (no encontrada)
    res.writeHead(404, { 'Content-Type': 'text/plain' });

    // Enviamos un mensaje de error indicando que la ruta no fue encontrada
    res.end('Ruta no encontrada');
  }
});

// Indicamos al servidor que comience a escuchar en el puerto 3000
servidor.listen(3000, () => {
  // Mostramos un mensaje por consola indicando que el servidor está en funcionamiento
  console.log('Servidor corriendo en http://localhost:3000');
});