const express = require("express");
const router = express.Router();

const { authenticateUser } = require("../middleware/authentication");

const {
  getAllCandidates,
  createCandidate,
} = require("../controllers/candidateController");

router.route("/").get(getAllCandidates).post(createCandidate);

module.exports = router;
