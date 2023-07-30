const User = require("../models/User");
const asyncHandler = require("../middleware/async");
const ErrorResponse = require("../utils/errorResponse");
const sendEmail = require("../utils/sendEmail");
const crypto = require("crypto");

exports.register = asyncHandler(async (req, res, next) => {
  const { name, email, password } = req.body;
  const user = await User.create({ name, email, password });

  sendTokenResponse(user, 201, res);
});

exports.login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new ErrorResponse("Please provide an email and password", 400));
  }

  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    return next(new ErrorResponse("Invalid Credentials", 401));
  }

  const isMatch = await user.matchPassword(password);
  if (!isMatch) {
    return next(new ErrorResponse("Invalid Credentials", 401));
  }

  sendTokenResponse(user, 200, res);
});

exports.getMe = asyncHandler(async (req, res, next) => {
  res.status(200).json({ succes: true, data: req.user });
});

exports.forgotPassword = asyncHandler(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return next(new ErrorResponse("There is no user with this email", 404));
  }

  const resetToken = user.getResetPasswordToken();
  await user.save({ validateBeforeSave: false });

  const resetUrl = `${req.protocol}://${req.get(
    "host"
  )}/api/v1/auth/resetpassword/${resetToken}`;
  const message = `You are receiving this email because you (or someone else) has requested the reset of a password. Please make a PUT request to: \n\n ${resetUrl}`;

  try {
    await sendEmail({
      email: user.email,
      subject: "Password reset token",
      message,
    });
    res.status(200).json({ succes: true, data: "Email Sent" });
  } catch (err) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpier = undefined;
    await user.save({ validateBeforeSave: false });
    return next(new ErrorResponse("Email could not be sent", 500));
  }
});

exports.sendOtp = asyncHandler(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return next(new ErrorResponse("There is no user with this email", 404));
  }

  const otp = user.getOtp();
  await user.save({ validateBeforeSave: false });

  const message = `${otp} is your verification code.`;
  try {
    await sendEmail({
      email: user.email,
      subject: "Tracker Verification Code",
      message,
    });
    res.status(200).json({ succes: true, data: "Email Sent" });
  } catch (err) {
    user.otp = undefined;
    user.otpExpire = undefined;
    await user.save({ validateBeforeSave: false });
    return next(new ErrorResponse("Email could not be sent", 500));
  }
});

exports.verifyOtp = asyncHandler(async (req, res, next) => {
  const otp = crypto.createHash("sha256").update(req.body.otp).digest("hex");

  const user = await User.findOne({
    otp: otp,
    otpExpire: { $gt: Date.now() },
  });
  if (!user) {
    return next(new ErrorResponse("Invalid OTP"));
  }

  const resetToken = user.getResetPasswordToken();
  user.otp = undefined;
  user.otpExpire = undefined;
  await user.save({ validateBeforeSave: false });

  res.status(200).json({ succes: true, resetToken });
});

exports.resetPassword = asyncHandler(async (req, res, next) => {
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.body.resetToken)
    .digest("hex");

  const user = await User.findOne({
    resetPasswordToken: resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  });
  if (!user) {
    return next(new ErrorResponse("Invalid Token"));
  }

  user.password = req.body.password;
  user.resetPasswordExpire = undefined;
  user.resetPasswordToken = undefined;
  await user.save();

  sendTokenResponse(user, 200, res);
});

exports.updateDetails = asyncHandler(async (req, res, next) => {
  const { name, email } = req.body;
  let user = await User.findById(req.user.id).select("+password");
  if (!user) {
    return next(
      new ErrorResponse(`User not found with ID: ${req.user.id}`, 404)
    );
  }

  if (
    req.user.id.toString() !== user._id.toString() &&
    req.user.role !== "admin"
  ) {
    return next(new ErrorResponse("Not authorized to update details", 401));
  }

  user = await User.findByIdAndUpdate(
    req.user.id,
    { name, email },
    {
      new: true,
      runValidators: true,
    }
  );

  res.status(200).json({ success: true, data: user });
});

exports.updatePassword = asyncHandler(async (req, res, next) => {
  let user = await User.findById(req.user.id).select("+password");
  if (!user) {
    return next(
      new ErrorResponse(`User not found with ID: ${req.user.id}`, 404)
    );
  }

  if (
    req.user.id.toString() !== user._id.toString() &&
    req.user.role !== "admin"
  ) {
    return next(new ErrorResponse("Not authorized to update details", 401));
  }

  const isMatch = await user.matchPassword(req.body.currentPassword);
  if (!isMatch) {
    return next(new ErrorResponse("Password does not match", 401));
  }

  user.password = req.body.newPassword;
  await user.save({ runValidators: true });

  res.status(200).json({ success: true, message: "Password Changed" });
});

const sendTokenResponse = (user, statusCode, res) => {
  const token = user.getSignedJwtToken();
  const options = {
    expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
    httpOnly: true,
  };
  res
    .status(statusCode)
    .cookie("token", token, options)
    .json({ success: true, token });
};
