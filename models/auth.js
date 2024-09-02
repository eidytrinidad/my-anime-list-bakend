const mongoose = require("mongoose");
const emailPattern = require("../helpers/emailPattern");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide a name"],
    minLength: 3,
    maxLength: 50,
  },
  email: {
    type: String,
    required: [true, "Please provide a name"],
    match: [emailPattern, "Please provide a valid email"],
    unique: true,
  },
  password: {
    type: String,
    minLength: 6,
    required: [true, "Please provide a valid password"],
  },
});

module.exports = mongoose.model("User", UserSchema);
