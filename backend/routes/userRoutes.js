const express = require("express");
const router = express.Router();

const {
  registerUser,
  loginUser,
   forgotPassword,
  resetPassword,
  logoutUser,
} = require("../controllers/userController");

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/forgot-password", forgotPassword);
router.put("/reset-password/:token", resetPassword);
router.post("/logout", logoutUser)
module.exports = router;
