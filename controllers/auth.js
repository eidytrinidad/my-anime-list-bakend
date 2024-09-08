const User = require("../models/auth");
const jwt = require("jsonwebtoken");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, UnauthenticatedError } = require("../errors");

const register = async (req, res) => {
  const user = await User.create(req.body);
  const { accessToken, refreshToken } = user.generateAuthToken();
  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000,
  });
  res.status(StatusCodes.CREATED).json({
    user: { name: user.name },
    accessToken,
  });
};
const refreshToken = async (req, res) => {
  if (!req.cookies["refreshToken"])
    throw new UnauthenticatedError("Unauthorized");
  const refreshToken = req.cookies["refreshToken"];

  const decodedToken = jwt.verify(
    refreshToken,
    process.env.REFRESH_TOKEN_SECRET
  );
  const user = await User.findById(decodedToken?.userId);

  if (!user) {
    throw new UnauthenticatedError("Invalid credentials");
  }
  const { accessToken } = user.generateAuthToken();
  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000,
  });
  return res
    .status(StatusCodes.OK)
    .json({ accessToken, msg: "Access token refreshed" });
};

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new BadRequestError("Please provide email and password");
  }
  const user = await User.findOne({ email });
  if (!user) {
    throw new UnauthenticatedError("Invalid credentials");
  }
  const isPasswordCorrect = await user.comparePassword(password, user.password);
  if (!isPasswordCorrect) {
    throw new UnauthenticatedError("Invalid credentials");
  }
  const { accessToken, refreshToken } = user.generateAuthToken();
  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000,
  });

  return res
    .status(StatusCodes.OK)
    .json({ user: { name: user.name }, accessToken });
};
const logout = async (req, res) => {
  res.cookie("refreshToken", "logout", {
    httpOnly: true,
    expires: new Date(Date.now() + 1000),
  });
  res.status(StatusCodes.OK).json({ msg: "user logged out!" });
};

module.exports = {
  login,
  register,
  refreshToken,
  logout,
};
