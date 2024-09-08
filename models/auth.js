const mongoose = require("mongoose");
const emailPattern = require("../helpers/emailPattern");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide a name"],
    minLength: 3,
    maxLength: 50,
  },
  email: {
    type: String,
    required: [true, "Please provide an email"],
    match: [emailPattern, "Please provide a valid email"],
    unique: true,
  },
  password: {
    type: String,
    minLength: 6,
    required: [true, "Please provide a valid password"],
  },
});

UserSchema.pre("save", async function () {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});
UserSchema.methods.generateAuthToken = function () {
  const accessToken = jwt.sign(
    { userId: this._id, name: this.name },
    process.env.JWT_SECRET,
    {
      expiresIn: "1h",
    }
  );

  const refreshToken = jwt.sign(
    { userId: this._id, name: this.name },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: "1d" }
  );
  const tokens = { accessToken, refreshToken };
  return tokens;
};

UserSchema.methods.comparePassword = async function (candidatePassword) {
  const isMatch = bcrypt.compare(candidatePassword, this.password);
  return isMatch;
};
module.exports = mongoose.model("User", UserSchema);
