const mongoose = require("mongoose");

const CandidateSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
  job: {
    type: mongoose.Schema.ObjectId,
    ref: "Job",
    required: true,
  },
});
CandidateSchema.index({ user: 1, job: 1 }, { unique: true });
module.exports = mongoose.model("Candidate", CandidateSchema);
