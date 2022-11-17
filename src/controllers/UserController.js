const User = require("../models/user");

class UserController {
  async updateUser(req, res) {
    const userId = { _id: req.params.id };
    const { password } = req.body;
    if (password) {
      password = await argon2.verify(req.user.password, password);
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

  async getStats(req, res) {
    const date = new Date();
    const latsYear = new Date(date.setFullYear(date.getFullYear() - 1));
    try {
      const data = await User.aggregate([
        {
          $match: {
            createAt: { $gte: latsYear },
          },
        },
        { $project: { month: { $month: "$createAt" } } },
        {
          $group: {
            _id: "$month",
            total: { $sum: 1 },
          },
        },
      ]);
      res.status(200).json(data);
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
