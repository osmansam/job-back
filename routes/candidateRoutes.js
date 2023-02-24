const express = require("express");
const router = express.Router();

const { authenticateUser } = require("../middleware/authentication");

const {
  getAllCandidates,
  createCandidate,
  checkCandidate,
  jobCandidates,
  updateCandidate,
  employeeJobs,
} = require("../controllers/candidateController");

router.route("/").get(getAllCandidates).post(createCandidate);
router.route("/update").patch(updateCandidate);
router.route("/check").post(checkCandidate);
router.route("/job").post(jobCandidates);
router.route("/employee").get(employeeJobs);

module.exports = router;
