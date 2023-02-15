const express = require("express");
const router = express.Router();

const { authenticateUser } = require("../middleware/authentication");
const {
  getAllJobs,
  getJob,
  createJob,
  updateJob,
  deleteJob,
} = require("../controllers/jobController");

router.get("/", authenticateUser, getAllJobs);
router.post("/", authenticateUser, createJob);
router.get("/:id", authenticateUser, getJob);
router.patch("/:id", authenticateUser, updateJob);
router.delete("/:id", authenticateUser, deleteJob);

module.exports = router;
