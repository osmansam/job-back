const Job = require("../models/Job");
const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors");
const mongoose = require("mongoose");
const moment = require("moment");

const getAllJobs = async (req, res) => {
  const jobs = await Job.find({ createdBy: req.user.userId });
  res.status(StatusCodes.OK).json({ jobs });
};
const getJob = async (req, res) => {
  const job = await Job.findById({
    _id: req.params.id,
    createdBy: req.user.userId,
  });
  if (!job) {
    throw new CustomError.NotFoundError("Job not found");
  }
  res.status(StatusCodes.OK).json({ job });
};
const createJob = async (req, res) => {
  req.body.createdBy = req.user.userId;
  const job = await Job.create(req.body);
  res.status(StatusCodes.CREATED).json({ job });
};
const updateJob = async (req, res) => {
  const { company, position } = req.body;
  if (!company || !position) {
    throw new CustomError.BadRequestError(
      "Please provide company and position"
    );
  }
  const job = await Job.findByIdAndUpdate(
    { _id: req.params.id, createdBy: req.user.userId },
    req.body,
    { new: true, runValidators: true }
  );
  if (!job) {
    throw new CustomError.NotFoundError("Job not found");
  }
  res.status(StatusCodes.OK).json({ job });
};
const deleteJob = async (req, res) => {
  const job = await Job.findById({
    _id: req.params.id,
    createdBy: req.user.userId,
  });
  if (!job) {
    throw new CustomError.NotFoundError("Job not found");
  }
  await job.remove();
  res.status(StatusCodes.OK).json({ job });
};
module.exports = {
  getAllJobs,
  getJob,
  createJob,
  updateJob,
  deleteJob,
};
