const mongoose = require("mongoose");

mongoose.connect(process.env.MONGODB_URL, {
  useNewUrlParser: true,
  userCreateIndex: true, // indexes are created to allow quick access to data
}); // ? to connect to database