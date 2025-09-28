import express from 'express';
import eventosController from '../controllers/eventosController.js';

const router = express.Router();

router.get('/', eventosController.mostrarEventos);
router.get('/nuevo', eventosController.formularioNuevoEvento);
router.post('/nuevo', eventosController.guardarEvento);
router.delete('/eliminar/:id', eventosController.eliminarEvento);

export default router;

/*
Problema con HTML y DELETE:
Los formularios HTML nativos solo soportan GET y POST.
Para poder usar DELETE desde un formulario,
 necesitás method-override
o enviar la petición desde fetch/JS.
*/
