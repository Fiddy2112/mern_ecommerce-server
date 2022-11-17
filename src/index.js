require("dotenv").config();
const express = require("express");
const cors = require("cors");
const db = require("./db.js");
const userRouter = require("./routes/user.js");
const authRouter = require("./routes/auth.js");
const productRouter = require("./routes/product.js");
const cartRouter = require("./routes/cart.js");
const orderRouter = require("./routes/order.js");

const app = express();
const port = process.env.PORT || 8080;

app.use(express.json());
app.use(cors());

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/products", productRouter);
app.use("/api/v1/carts", cartRouter);
app.use("/api/v1/orders", orderRouter);

app.listen(port, () => {
  // connected to mongoDb
  db.connect();

  // connected to server
  console.log(`Connected to backend on port ${port}`);
});
