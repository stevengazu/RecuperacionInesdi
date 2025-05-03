const express = require("express");
const app = express();
const router = require("./config/routes.config");
require("./config/db.config");
app.use(express.json());



app.use("/api/v1",router);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
