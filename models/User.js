const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const UserSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required."],
  },
  email: {
    type: String,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Email is not valid",
    ],
    required: [true, "Email is required."],
    unique: true,
  },
  role: {
    type: String,
    enum: ["user", "owner", "admin"],
    default: "user",
  },
  password: {
    type: String,
    required: [true, "Password is required."],
    minlength: [6, "Password must be atleast 6 characters"],
    select: false,
  },
  resetPasswordToken: String,
  resetPasswordExpire: Date,
  otp: String,
  otpExpire: Date,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

UserSchema.methods.getSignedJwtToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

UserSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

UserSchema.methods.getResetPasswordToken = function () {
  const resetToken = crypto.randomBytes(20).toString("hex");
  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  this.resetPasswordExpire = Date.now() + 30 * 60 * 1000;
  return resetToken;
};

UserSchema.methods.getOtp = function () {
  const otp = crypto.randomInt(1000, 9999);
  this.otp = crypto.createHash("sha256").update(otp.toString()).digest("hex");

  this.otpExpire = Date.now() + 10 * 60 * 1000;
  return otp;
};

module.exports = mongoose.model("User", UserSchema);
