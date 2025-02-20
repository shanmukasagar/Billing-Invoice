const express = require("express");
const { getAllProducts } = require("../controllers/formController");

const router = express.Router();

router.get("/produts", getAllProducts);

module.exports = router;
