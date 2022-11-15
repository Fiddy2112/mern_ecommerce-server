const express = require("express");
const ProductController = require("../controllers/ProductController");
const { verifyToken } = require("../middleware/auth");
const router = express.Router();

router.get("/", verifyToken, ProductController.create);

module.exports = router;
