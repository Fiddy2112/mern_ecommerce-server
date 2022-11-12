const express = require("express");
const UserController = require("../controllers/UserController");
const { verifyTokenAdmin, verifyToken } = require("../middleware/auth");
const router = express.Router();

router.put("/:id", verifyTokenAdmin, UserController.updateUser);

module.exports = router;
