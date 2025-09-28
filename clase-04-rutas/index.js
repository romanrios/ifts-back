const express = require("express");
const temarioRoutes = require("./routes/temarioRoutes");

const app = express();
const PORT = 3000;

app.use(express.json());

// Uso de rutas
app.use("/", temarioRoutes);

app.listen(PORT, () => {
    console.log(`Servidor conectado en http://localhost:${PORT}`);
});
