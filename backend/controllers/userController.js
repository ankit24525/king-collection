const User = require("../models/User");
const bcrypt = require("bcryptjs");
const generateToken = require("../utils/generatorToken");
const crypto = require("crypto");
const sendEmail = require("../utils/sendEmail");
const token=generateToken(User)
/* REGISTER USER */

exports.registerUser = async (req, res) => {
  try {

    const { name, email, password } = req.body;

    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({ msg: "User already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      name,
      email,
      password: hashedPassword
    });

    const token = generateToken(user._id);

    res.cookie("token", token, {
      httpOnly: true,
      secure: false, // true in production
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000
    });

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin
    });

  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};


/* LOGIN USER */

exports.loginUser = async (req, res) => {
  try {

    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ msg: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ msg: "Invalid credentials" });
    }

    const token = generateToken(user);

    res.cookie("token", token, {
      httpOnly: true,
      secure: false, // true in production
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000
    });

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin
    });

  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};


/* LOGOUT USER */

exports.logoutUser = (req, res) => {

  res.cookie("token", "", {
    httpOnly: true,
    expires: new Date(0)
  });

  res.json({ msg: "Logged out successfully" });
};


/* FORGOT PASSWORD */

exports.forgotPassword = async (req, res) => {
  try {

    const { email } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    const resetToken = crypto.randomBytes(32).toString("hex");

    user.resetPasswordToken = resetToken;
    user.resetPasswordExpire = Date.now() + 15 * 60 * 1000;

    await user.save();

    const resetURL =
      `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;

    await sendEmail(
      user.email,
      "Password Reset",
      `<h3>Reset Password</h3>
       <p>Click the link below to reset your password</p>
       <a href="${resetURL}">${resetURL}</a>`
    );

    res.json({ msg: "Reset email sent" });

  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};


/* RESET PASSWORD */

exports.resetPassword = async (req, res) => {
  try {

    const { token } = req.params;
    const { password } = req.body;

    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpire: { $gt: Date.now() }
    });

    if (!user) {
      return res.status(400).json({ msg: "Token expired or invalid" });
    }

    user.password = await bcrypt.hash(password, 10);

    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    res.json({ msg: "Password updated successfully" });

  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
exports.logoutUser = (req, res) => {

  res.cookie("token", "", {
    httpOnly: true,
    expires: new Date(0)
  });

  res.json({ msg: "Logged out" });

};