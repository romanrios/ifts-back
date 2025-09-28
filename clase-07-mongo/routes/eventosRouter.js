import express from 'express';
import eventosController from '../controllers/eventosController.js';

const router = express.Router();

router.get('/', eventosController.mostrarEventos);
router.get('/nuevo', eventosController.formularioNuevoEvento);
router.post('/nuevo', eventosController.guardarEvento);
router.delete('/eliminar/:id', eventosController.eliminarEvento);

export default router;