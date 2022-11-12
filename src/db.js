const mongoose = require("mongoose");

async function connect() {
  try {
    await mongoose.connect(
      `mongodb://${process.env.PORT_MONGO}/${process.env.DB_NAME}`
    );
    console.log("Connected to MongoDB");
  } catch (err) {
    console.log("Connect failure!!");
  }
}

module.exports = { connect };
