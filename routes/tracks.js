const express = require("express");

const { getAllTracks, addTrack } = require("../controllers/tracks");

const { protect } = require("../middleware/auth");

const router = express.Router();

router.use(protect);

router.route("/").get(getAllTracks).post(addTrack);

module.exports = router;
