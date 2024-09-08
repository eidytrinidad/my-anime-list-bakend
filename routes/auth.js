const express = require("express");
const {
  login,
  register,
  refreshToken,
  logout,
} = require("../controllers/auth");
const router = express.Router();

router.route("/login").post(login);
router.post("/register", register);
router.post("/refresh", refreshToken);
router.get("/logout", logout);

module.exports = router;
