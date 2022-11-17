const express = require("express");
const UserController = require("../controllers/UserController");
const {
  verifyTokenAdmin,
  verifyToken,
  verifyTokenAuthors,
} = require("../middleware/auth");
const router = express.Router();

router.put("/:id", verifyTokenAuthors, UserController.updateUser);
router.get("/:id", verifyTokenAdmin, UserController.getStats);

module.exports = router;
