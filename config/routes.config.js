const express = require("express");
const router = express.Router();
const postsController = require("../controllers/posts.controller");

// Rutas Doc recuperacion
router.get("/search", postsController.search);
router.put("/update-or-create", postsController.updateOrCreate);
router.delete("/delete", postsController.deleteByQuery);
//---------------------------------


module.exports = router;