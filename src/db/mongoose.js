const mongoose = require("mongoose");

mongoose.connect(process.env.MONGODB_LOCALURL, {
  useNewUrlParser: true,
  userCreateIndex: true, // indexes are created to allow quick access to data
}); // ? to connect to database