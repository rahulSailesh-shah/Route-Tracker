const express = require("express");

const {
  getUsers,
  addUser,
  getUser,
  updateUser,
  deleteUser,
} = require("../controllers/users");
const { protect, authorize } = require("../middleware/auth");

const router = express.Router();

router.use(protect);
router.use(authorize(["admin"]));

router.route("/").get(getUsers).post(addUser);

router.route("/:id").get(getUser).put(updateUser).delete(deleteUser);

module.exports = router;
