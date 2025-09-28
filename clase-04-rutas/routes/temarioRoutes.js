const express = require("express");
const { 
    getTemario, 
    addTema, 
    updateTema, 
    patchTema, 
    deleteTema 
} = require("../controllers/temarioController");

const router = express.Router();

// Rutas
router.get("/", getTemario);        // GET    /temario
router.post("/agregar", addTema);   // POST   /temario/agregar
router.put("/:id", updateTema);     // PUT    /temario/:id
router.patch("/:id", patchTema);    // PATCH  /temario/:id
router.delete("/:id", deleteTema);  // DELETE /temario/:id

module.exports = router;
/*
Endpoint:es el punto de acceso completo a una API, que combina:

1 - La URL base del servidor
2 - La ruta
3 - El método HTTP (GET, POST, PUT, DELETE, etc.)

GET http://localhost:3000/ → es un endpoint.
POST http://localhost:3000/agregar → es otro endpoint.
*/
