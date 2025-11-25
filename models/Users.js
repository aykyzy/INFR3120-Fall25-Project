// Imports mongoose
const mongoose = require("mongoose");

// creates user schema
// defines structure for user documents
const userSchema = new mongoose.Schema({
  
  // username field
  username: {
    // must be a string
    type: String,
    // required field
    required: true,
    // must be unique
    unique: true,
    // remove spaces
    trim: true,
    // minimum length
    minlength: 3,
  },

  // password field
  password: {
    // must be a string
    type: String,
    // required field
    required: true,
    // minimum length
    minlength: 6,
  },
});

// export model
// makes "User" available to use in other files
module.exports = mongoose.model("User", userSchema);
