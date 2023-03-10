const Candidate = require("../models/Candidate");
const Profile = require("../models/Profile");
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
  const candidates = await Candidate.find({ job: jobId });
  for (let i = 0; i < candidates.length; i++) {
    const profile = await Profile.findOne({ createdBy: candidates[i].user });
    //burasi candidate a profile eklenerek cozulecek
    let id = candidates[i]._id;
    let isAccepted = candidates[i].isAccepted;
    let isRejected = candidates[i].isRejected;
    let isPending = candidates[i].isPending;
    candidates[i] = profile;
    candidates[i]._id = id;
    candidates[i] = {
      ...candidates[i]._doc,
      isAccepted,
      isRejected,
      isPending,
    };
  }
  res.status(StatusCodes.OK).json(candidates);
};
const updateCandidate = async (req, res) => {
  const { candidateId } = req.body;
  const candidate = await Candidate.findOneAndUpdate(
    { _id: candidateId },
    req.body,
    { new: true, runValidators: true }
  );
  if (!candidate) {
    throw new CustomError.NotFoundError("Candidate not found");
  }
  res.status(StatusCodes.OK).json({ candidate });
};
const employeeJobs = async (req, res) => {
  const candidates = await Candidate.find({ user: req.user.userId })
    .populate({
      path: "job",
    })
    .select("-user -isAccepted -isRejected -isPending");
  res.status(StatusCodes.OK).json(candidates);
};
const deleteCandidate = async (req, res) => {
  const { jobId, userId } = req.body;
  if (!jobId || !userId) {
    throw new CustomError.BadRequestError("Job id or user id is missing");
  }

  const candidate = await Candidate.findOneAndDelete({
    job: jobId,
    user: req.user.userId,
  });
  if (!candidate) {
    throw new CustomError.NotFoundError("Candidate not found");
  }
  res.status(StatusCodes.OK).json({ msg: "deleted successfuly" });
};
module.exports = {
  createCandidate,
  getAllCandidates,
  checkCandidate,
  jobCandidates,
  updateCandidate,
  employeeJobs,
  deleteCandidate,
};
