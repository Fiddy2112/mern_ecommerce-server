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
    // jwt.verify(token, process.env.ACCESS_TOKEN, (err, user) => {
    //   if (err) res.status(403).json("Token is not valid!");
    //   req.user = user;
    //   next();
    // });

    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN);

    req.id = decoded.id;
    next();
  } catch (e) {
    console.log(e);
    return res.status(401).json({
      success: false,
      message: "Invalid token",
    });
  }
};

// const verifyToken = (req, res, next) => {
//   const authHeader = req.header.token;
//   if (authHeader) {
//     const token = authHeader.split(" ")[1];
//     jwt.verify(token, process.env.ACCESS_TOKEN, (err, user) => {
//       if (err) res.status(403).json("Token is not valid!");
//       req.user = user;
//       next();
//     });
//   } else {
//     res.status(401).json("You are not authenticated!");
//   }
// };

const verifyTokenAuthors = (req, res, next) => {
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

const verifyTokenAdmin = (req, res, next) => {
  verifyToken(
    (req,
    res,
    () => {
      if (req.user.isAdmin) {
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

module.exports = { verifyToken, verifyTokenAdmin, verifyTokenAuthors };
