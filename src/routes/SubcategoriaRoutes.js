const express = require("express");
const { getAllSubcategorias,createSubcategoria, getSubcategoriaById,updateSubcategoria,deleteSubcategoria, getSubcategoriaByIdCategoria} = require("../controllers/SubcategoriaController");
const router = express.Router();

router.route("/getallsubcategorias").get(getAllSubcategorias);
router.route("/:id").get(getSubcategoriaByIdCategoria).put(updateSubcategoria).delete(deleteSubcategoria);
router.route("/").post(createSubcategoria);




module.exports = router;
 