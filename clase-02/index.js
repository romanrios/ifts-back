const express = require("express");
const app = express();
const PORT = 3000;

app.use(express.json());

let temario = [
    { id: 1, titulo: "Intro Node JS", descripcion: "Comenzando" },
    { id: 2, titulo: "Modulos Node JS", descripcion: "Siguiendo" }]

app.get("/temario", (req, res) => {
    res.json(temario);
});

app.post("/agregar", (req, res) => {
    const { id, titulo, descripcion } = req.body;
    const nuevoTema = { id, titulo, descripcion };
    temario.push(nuevoTema);
    res.status(201).json({
        mensaje: "Agregado", tema: nuevoTema
    })
});

app.listen(PORT, () => {
    console.log(`Conectado al puerto ${PORT}`);
});