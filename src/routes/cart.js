const express = require("express");
const CartController = require("../controllers/CartController");
const {
  verifyToken,
  verifyTokenAuthors,
  verifyTokenAdmin,
} = require("../middleware/auth");
const router = express.Router();

router.post("/", verifyToken, CartController.create);
router.put("/:id", verifyTokenAuthors, CartController.update);
router.delete("/:id", verifyTokenAdmin, CartController.delete);
router.get("/:userId", verifyTokenAuthors, CartController.getCart);
router.get("/", verifyTokenAdmin, CartController.getAllCart);

module.exports = router;
