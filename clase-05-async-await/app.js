/*¿Por qué cambiamos .then() por async/await?
Cuando trabajamos con operaciones asíncronas como leer un archivo, 
esperar un tiempo, o hacer una petición a un servidor, usamos promesas.
Tradicionalmente, usamos .then() para manejar el resultado de una promesa:
tareaAsincrona().then(resultado => {
  console.log(resultado);
});
Pero esto puede volverse difícil de leer si hay varias operaciones encadenadas o anidadas.
Con async/await, el código queda más limpio y parecido al estilo sincrónico 
(el de toda la vida), pero sigue siendo asíncrono por dentro:

const resultado = await tareaAsincrona();
console.log(resultado);
Esto: Hace que el código sea más legible y fácil de entender. Permite usar try/catch 
para manejar errores de forma más clara. Usamos async/await en lugar de .then() porque:
El código es más limpio, es más fácil de leer y mantener y el manejo de errores  es más claro
*/
// Importamos el módulo 'http' 
const http = require('http');

// Función que simula una tarea asíncrona y devuelve una Promesa
function tareaAsincronaConPromesa() {
  return new Promise((resolve, reject) => {
    const tiempo = Math.floor(Math.random() * 3000) + 1000;
    setTimeout(() => {
      const mensaje = `Tarea completada en ${tiempo}ms`;
      resolve(mensaje);
    }, tiempo);
  });
}

// Creamos el servidor HTTP
const servidor = http.createServer(async (req, res) => {
  if (req.url === '/procesar') {
    try {
      // Esperamos que la tarea termine usando await
      const resultado = await tareaAsincronaConPromesa();

      // Enviamos una respuesta 200 OK con el resultado
      res.writeHead(200, { 'Content-Type': 'text/plain' });
      res.end(resultado);
    } catch (error) {
      // Si algo falla, respondemos con un error 500
      res.writeHead(500, { 'Content-Type': 'text/plain' });
      res.end('Error en la tarea asíncrona');
    }
  } else {
    // Si la ruta no existe, devolvemos 404
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Ruta no encontrada');
  }
});

// El servidor escucha en el puerto 3000
servidor.listen(3000, () => {
  console.log('Servidor corriendo en http://localhost:3000');
});