const mongoose  = require("mongoose");
const path = require("path");
const fs = require("fs");
const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/RecuperacionDB";  
const User = require("../models/post.model");

mongoose.connect(MONGO_URI)
  .then(async () => {
    console.log("MongoDB connected");

    // Verificar si la colección ya tiene datos
    const existingUsers = await User.find();
    if (existingUsers.length > 0) {
      console.log("La base de datos ya contiene datos. No se insertarán nuevos datos.");
    } else {
      console.log("La base de datos está vacía. Insertando datos...");
      const filePath = path.join(__dirname, "../data/users.json");
      const usersData = JSON.parse(fs.readFileSync(filePath, "utf-8"));

      // Insertar los datos en la base de datos
      await User.insertMany(usersData);
      console.log("Datos insertados correctamente");
    }
  })
  .catch(err => {
    console.error("Error al conectar o procesar datos:", err);
    mongoose.disconnect();
  });