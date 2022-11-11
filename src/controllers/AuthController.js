require("dotenv").config();
const User = require("../models/user");
const argon2 = require("argon2");
var jwt = require("jsonwebtoken");

class AuthController {
  /**
   * @route POST api/v1/auth/register
   * @desc Register user
   * @access Public
   */

  async register(req, res) {
    const { username, email, password } = req.body;
    // Simple validation
    if (!username || !password) {
      return res.status(400).json({
        success: false,
        message: "Missing username and/or password",
      });
    }
    try {
      // check for existing user
      const user = await User.findOne({ username });

      //username taken
      if (user) {
        return res
          .status(400)
          .json({ success: false, message: "Username already taken" });
      }

      //All good -> hash password

      const hasPassword = await argon2.hash(password);

      const newUser = new User({
        username,
        email,
        password: hasPassword,
      });

      await newUser.save();

      const accessToken = await jwt.sign(
        { id: newUser._id },
        process.env.ACCESS_TOKEN
      );

      // Successfully
      res.status(200).json({
        success: true,
        message: "The user has been created successfully!!",
        accessToken,
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
   * @route POST api/v1/auth/login
   * @desc Login user
   * @access Public
   */

  async login(req, res) {
    const { username, password } = req.body;
    // Simple validation
    if (!username || !password) {
      return res.status(400).json({
        success: false,
        message: "Missing username and/or password",
      });
    }
    try {
      // Check for existing user
      const user = await User.findOne({ username });
      if (!user) {
        return res.status(400).json({
          success: false,
          message: "Incorrect username or password",
        });
      }
      //To verify a password
      const passwordValid = await argon2.verify(user.password, password);

      if (!passwordValid) {
        return res.status(400).json({
          success: false,
          message: "Incorrect username or password",
        });
      }
      // All good --> access token
      const accessToken = await jwt.sign(
        { id: user._id, isAdmin: user.isAdmin },
        process.env.ACCESS_TOKEN,
        { expiresIn: "3d" }
      );

      // const { password, ...others } = user._doc;

      res.status(200).json({
        success: true,
        message: "User logged in successfully",
        accessToken,
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

module.exports = new AuthController();
