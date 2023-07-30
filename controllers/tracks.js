const Track = require("../models/Track");
const asyncHandler = require("../middleware/async");
const ErrorResponse = require("../utils/errorResponse");

exports.getAllTracks = asyncHandler(async (req, res, next) => {
  const tracks = await Track.find({ userID: req.user._id });

  res.status(200).json({
    success: true,
    data: tracks,
  });
});

exports.addTrack = asyncHandler(async (req, res, next) => {
  const { name, locations, distance } = req.body;

  if (!name || !locations) {
    return next(new ErrorResponse("Name and locations are required", 400));
  }

  const track = await Track.create({
    name,
    distance,
    locations,
    userID: req.user._id,
  });
  res.status(200).json({
    success: true,
    data: track,
  });
});
