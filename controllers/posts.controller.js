const User = require("../models/post.model");
// controller para manejar las del DOC
module.exports.search = (req, res) => {
    const query = req.query; // Obtiene los parámetros de consulta de la URL
    User.find(query) // Busca en la base de datos usando los parámetros
        .then((results) => {
            if (results.length === 0) {
                return res.status(404).json({ message: "No se encontraron resultados" });
            }
            res.status(200).json(results); // Devuelve los documentos encontrados
        })
        .catch((error) => {
            console.error("Error al realizar la búsqueda:", error);
            res.status(500).json({ error: "Error al realizar la búsqueda" });
        
        });
};

module.exports.updateOrCreate = (req, res) => {
    const query = req.body.query; // Obtiene los parámetros de consulta de la URL
    const update = req.body.update; // Obtiene los parámetros de consulta de la URL

    User.findOneAndUpdate(query, update, { new: true, upsert: true })
    .then((result) => {
        if (result.upserted) {
            // Si se creó un nuevo documento
            res.status(201).json({ message: "Documento creado", document: result });
        } else {
            // Si se actualizó un documento existente
            res.status(200).json({ message: "Documento actualizado", document: result });
        }
    })
    .catch((error) => {
        console.error("Error al actualizar o crear el documento:", error);
        res.status(400).json({ error: "Error al actualizar o crear el documento" });
    });
};

module.exports.deleteByQuery = (req, res) => {  
    const query = req.body.query; // Obtiene los parámetros de consulta de la URL

    User.deleteMany(query) // Elimina los documentos que cumplan con la condición
        .then((result) => {
            if (result.deletedCount === 0) {
                // Si no se encontraron documentos para eliminar
                return res.status(204).send(); // 204 No Content
            }
            
            // Si se eliminaron documentos
            res.status(200).json({ message: "Documentos eliminados", deletedCount: result.deletedCount });
        })
        .catch((error) => {
            console.error("Error al eliminar los documentos:", error);
            res.status(400).json({ error: "Error al eliminar los documentos" });
        });
}
//--------------------------------------------------------------------
