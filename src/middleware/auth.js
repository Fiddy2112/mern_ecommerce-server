require("dotenv").config();
const jwt = require("jsonwebtoken");

// Trong Authorization:Bearer Access_token --> muon lay ra token chu khong phai Bearer -> req.header('Authorization').split(' ')[1]
const verifyToken = (req, res, next) => {
  const authHeader = req.header("Authorization");
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Access token not found",
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN);

    req.id = decoded.id;
    next();
  } catch (e) {
    console.log(e);
    return res.status(403).json({
      success: false,
      message: "Invalid token",
    });
  }
};

const verifyTokenAndAuthors = (req, res) => {
  verifyToken(
    (req,
    res,
    () => {
      if (req.user.id === req.params.id || req.user.isAdmin) {
        next();
      } else {
        res.status(400).json({
          success: false,
          message: "You are not allowed to do that !",
        });
      }
    })
  );
};

module.exports = { verifyToken, verifyTokenAndAuthors };