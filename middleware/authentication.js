const jwt = require("jsonwebtoken");
const { UnauthenticatedError } = require("../errors");

const auth = async (req, _, next) => {
  const authHeader = req.headers.authorization;
  const refreshToken = req.cookies["refreshToken"];

  if (!authHeader || !authHeader.startsWith("Bearer ") || !refreshToken) {
    throw new UnauthenticatedError("Authentication Invalid");
  }

  const token = authHeader.split(" ")[1];
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { userId: payload.userId, name: payload.name };
    next();
  } catch (error) {
    throw new UnauthenticatedError("Authentication Invalid");
  }
};

module.exports = auth;
