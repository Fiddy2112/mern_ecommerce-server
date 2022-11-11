const User = require("../models/user");

class UserController {
  async updateUser(req, res) {
    const userId = req.params.id;
    const { password } = req.body;
    if (password) {
      password = argon2.hash(password);
    }
    try {
      const updatedUser = await User.findByIdAndUpdate(
        userId,
        {
          $set: req.body,
        },
        { new: true }
      );

      res.status(200).json({
        success: true,
        message: "Updated complete",
        updatedUser,
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }
  }
}

module.exports = new UserController();
