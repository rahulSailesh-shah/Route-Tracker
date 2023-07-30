const mongoose = require("mongoose");

const PointSchema = mongoose.Schema({
  timestamp: Number,
  coords: {
    latitude: Number,
    longitude: Number,
    altitude: Number,
    accuracy: Number,
    heading: Number,
    speed: Number,
  },
});

const TrackSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
  },
  distance: {
    type: String,
    required: [true, "Distance is required"],
  },
  userID: {
    type: mongoose.Schema.ObjectId,
    ref: "USer",
  },
  locations: [PointSchema],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Track", TrackSchema);
