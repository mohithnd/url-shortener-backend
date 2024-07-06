const mongoose = require("mongoose");
const { DB_URL } = require("./serverConfig");

async function connect() {
  try {
    await mongoose.connect(DB_URL);
    console.log("Successfully Connected To DB");
  } catch (err) {
    console.log("Unable To Connect To DB");
    console.log(err);

    process.exit();
  }
}

module.exports = connect;
