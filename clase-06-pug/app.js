import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import methodOverride from 'method-override';
import eventosRouter from './routes/eventosRouter.js';

const app = express();

// Configuración de __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(methodOverride('_method')); // <-- permite DELETE desde formularios
app.use(express.static(path.join(__dirname, 'public')));

// Configuración de vistas (Pug)
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

// Rutas
app.use('/', eventosRouter);

// Servidor
app.listen(3000, () => console.log('Servidor en http://localhost:3000/'));
