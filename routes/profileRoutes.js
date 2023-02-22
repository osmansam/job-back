const express = require("express");
const router = express.Router();

const { authenticateUser } = require("../middleware/authentication");

const {
  getProfile,
  createProfile,
  updateProfile,
  deleteProfile,
} = require("../controllers/profileController");

router.get("/", authenticateUser, getProfile);
router.post("/", authenticateUser, createProfile);
router.patch("/:id", authenticateUser, updateProfile);
router.delete("/:id", authenticateUser, deleteProfile);

module.exports = router;
