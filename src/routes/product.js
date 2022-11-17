const express = require("express");
const ProductController = require("../controllers/ProductController");
const { verifyToken } = require("../middleware/auth");
const router = express.Router();

router.post("/", verifyToken, ProductController.create);
router.put("/:id", verifyToken, ProductController.update);
router.delete("/:id", verifyToken, ProductController.delete);
router.get("/findProduct/:id", ProductController.getProduct);
router.get("/findAllProduct", ProductController.getAllProduct);

module.exports = router;
