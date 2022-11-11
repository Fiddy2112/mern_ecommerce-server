const express = require("express");
const UserController = require("../controllers/UserController");
const { verifyTokenAndAuthors } = require("../middleware/auth");
const router = express.Router();

router.put("/:id", verifyTokenAndAuthors, UserController.updateUser);

module.exports = router;
