const express = require("express");
const temario = require("./data/temario");
const { crearTemario } = require('./controllers/temarioController');

const temarioRoutes = require('./routes/temarioRoutes');

const app = express();
const PORT = 3000;

app.use(express.json());

// Rutas
app.use("/temario", temarioRoutes);


// app.get("/temario", (req, res) => {
//     res.json(temario);
// });

// app.post("/agregar", crearTemario);

app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});