const express = require("express");
const { getAllSubcategorias,createSubcategoria, getSubcategoriaById,updateSubcategoria,deleteSubcategoria} = require("../controllers/SubcategoriaController");
const router = express.Router();

router.route("/getallsubcategorias").get(getAllSubcategorias);
router.route("/:id").get(getSubcategoriaById).put(updateSubcategoria).delete(deleteSubcategoria);
router.route("/").post(createSubcategoria);




module.exports = router;
 