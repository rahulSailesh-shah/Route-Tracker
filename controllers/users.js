const User = require("../models/User");
const asyncHandler = require("../middleware/async");
const ErrorResponse = require("../utils/errorResponse");

exports.getUsers = asyncHandler(async (req, res, next) => {
  const users = await User.find();
  res.status(200).json({ success: true, count: users.length, data: users });
});

exports.getUser = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    return next(new ErrorResponse("User not found", 404));
  }
  res.status(200).json({ success: true, data: user });
});

exports.addUser = asyncHandler(async (req, res, next) => {
  const user = await User.create(req.body);
  res.status(200).json({ success: true, data: user });
});

exports.updateUser = asyncHandler(async (req, res, next) => {
  let user = await User.findById(req.params.id).select("+password");
  if (!user) {
    return next(new ErrorResponse("User not found", 404));
  }

  const { name, email, password } = req.body;
  user.name = name || user.name;
  user.password = password || user.password;
  user.email = email || user.email;

  await user.save();
  res.status(200).json({ success: true, data: user });
});

exports.deleteUser = asyncHandler(async (req, res, next) => {
  let user = await User.findById(req.params.id);
  if (!user) {
    return next(new ErrorResponse("User not found", 404));
  }

  let devices = await Device.find({ owner: req.params.id });
  if (devices.length > 0) {
    return next(
      new ErrorResponse(
        `User is owner of project: ${devices[0].project}. Change the Project Ownership or delete the devices inorder to delete user`,
        400
      )
    );
  }

  await user.remove();
  res.status(200).json({ success: true, data: {} });
});
