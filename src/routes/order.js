const express = require("express");
const OrderController = require("../controllers/OrderController");
const {
  verifyToken,
  verifyTokenAuthors,
  verifyTokenAdmin,
} = require("../middleware/auth");
const router = express.Router();

router.post("/", verifyToken, OrderController.create);
router.put("/:id", verifyTokenAdmin, OrderController.update);
router.delete("/:id", verifyTokenAuthors, OrderController.delete);
router.get("/:userId", verifyTokenAuthors, OrderController.getOrder);
router.get("/", verifyTokenAdmin, OrderController.getAllOrder);

module.exports = router;
