const User = require("../models/user");

class UserController {
  async updateUser(req, res) {
    const userId = req.params.id;
    const { password } = req.body;
    if (password) {
      password = await argon2.verify(user.password, password);
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

  /**
   * @route GET api/auth/
   * @desc Check if user is logged in
   * @access Public
   */

  async userLogged(req, res) {
    try {
      // select('-password') : exclude password
      const user = await User.findById(req.userId).select("-password");
      if (!user) {
        return res.status(400).json({
          success: false,
          massage: "User not found",
        });
      }
      res.status(200).json({
        success: true,
        user,
      });
    } catch (err) {
      console.error(error);
      res.status(500).json({
        success: false,
        message: "Internal server error",
        error,
      });
    }
  }
}

module.exports = new UserController();
