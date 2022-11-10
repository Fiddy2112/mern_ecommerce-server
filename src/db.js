const mongoose = require("mongoose");

async function connect() {
  try {
    await mongoose.connect("mongodb://localhost:27017/mern-ecommerce");
    console.log("Connected to MongoDB");
  } catch (err) {
    console.log("Connect failure!!");
  }
}

module.exports = { connect };
