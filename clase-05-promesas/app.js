/**
 * ¿Qué es una Promesa?
 * Una Promesa es un objeto que representa un valor que puede estar disponible ahora,
 * en el futuro o nunca. Permite manejar operaciones asíncronas de forma más legible
 * y estructurada que los callbacks.
 * 
 * Este servidor responde a la ruta /procesar, simulando una tarea asíncrona
 * que tarda entre 1 y 4 segundos, y devuelve un mensaje con el tiempo que tardó.
 */

// Importamos el módulo 'http' de Node.js, que nos permite crear un servidor web
const http = require('http');

// Definimos una función que simula una tarea asíncrona y devuelve una Promesa
function tareaAsincronaConPromesa() {
  // Creamos y devolvemos una nueva Promesa. Tiene dos parámetros: resolve: se llama cuando la tarea termina bien.
  // reject: se llama cuando la tarea falla o hay un error.
  return new Promise((resolve, reject) => {
    // Generamos un número aleatorio entre 1000 y 4000 milisegundos
    const tiempo = Math.floor(Math.random() * 3000) + 1000;

    // Usamos setTimeout para simular una tarea que tarda "tiempo" milisegundos
    setTimeout(() => {
      // Creamos un mensaje que indica cuánto tardó la tarea
      const mensaje = `Tarea completada en ${tiempo}ms`;

      // Resolvemos la promesa con el mensaje generado
      resolve(mensaje);
    }, tiempo); // Esperamos el tiempo aleatorio antes de resolver
  });
}

// Creamos un servidor HTTP
const servidor = http.createServer((req, res) => {
  // Verificamos si la ruta solicitada es exactamente '/procesar'
  if (req.url === '/procesar') {
    // Llamamos a la función que devuelve una Promesa
    tareaAsincronaConPromesa()
      // Cuando la promesa se resuelve, enviamos la respuesta al cliente
      .then((resultado) => {
        // Establecemos un encabezado HTTP 200 (OK) con contenido tipo texto plano
        res.writeHead(200, { 'Content-Type': 'text/plain' });

        // Enviamos el mensaje de resultado como cuerpo de la respuesta
        res.end(resultado);
      })
      // Si ocurre un error (por ejemplo, si usamos reject), lo capturamos acá
      .catch((error) => {
        // Devolvemos un código 500 (Error interno del servidor)
        res.writeHead(500, { 'Content-Type': 'text/plain' });

        // Enviamos un mensaje de error genérico
        res.end('Error en la tarea asíncrona');
      });
  } else {
    // Si la ruta no es /procesar, devolvemos un 404 (no encontrado)
    res.writeHead(404, { 'Content-Type': 'text/plain' });

    // Enviamos un mensaje indicando que la ruta no existe
    res.end('Ruta no encontrada');
  }
});

// Le decimos al servidor que escuche en el puerto 3000
servidor.listen(3000, () => {
  // Mostramos un mensaje en la consola indicando que el servidor está funcionando
  console.log('Servidor corriendo en http://localhost:3000');
});
