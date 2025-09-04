const express = require("express");
const temarioRoutes = require('./routes/temarioRoutes');
const app = express();
const PORT = 3000;

app.use(express.json());

// Rutas
app.use("/temario", temarioRoutes);

app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});