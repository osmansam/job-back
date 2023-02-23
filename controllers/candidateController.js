const Candidate = require("../models/Candidate");
const Job = require("../models/Job");
const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors");

const createCandidate = async (req, res) => {
  const { job: jobId } = req.body;
  const isValidJob = await Job.findById(jobId);
  if (!isValidJob) {
    throw new CustomError.NotFoundError("Job not found");
  }
  const alreadyApplied = await Candidate.findOne({
    user: req.user.userId,
    job: jobId,
  });
  if (alreadyApplied) {
    throw new CustomError.BadRequestError("You already applied for this job");
  }
  const candidate = await Candidate.create({
    user: req.user.userId,
    job: jobId,
  });
  res.status(StatusCodes.CREATED).json({ candidate });
};
const getAllCandidates = async (req, res) => {
  const candidates = await Candidate.find().populate({
    path: "job",
  });
  res.status(StatusCodes.OK).json(candidates);
};
const checkCandidate = async (req, res) => {
  const { job: jobId } = req.body;
  const alreadyApplied = await Candidate.findOne({
    user: req.user.userId,
    job: jobId,
  });
  const isCandidate = alreadyApplied ? true : false;
  res.status(StatusCodes.OK).json({ isCandidate });
};
const jobCandidates = async (req, res) => {
  const { job: jobId } = req.body;
  const candidates = await Candidate.find({ job: jobId }).select("user");
  res.status(StatusCodes.OK).json(candidates);
};

module.exports = {
  createCandidate,
  getAllCandidates,
  checkCandidate,
  jobCandidates,
};
