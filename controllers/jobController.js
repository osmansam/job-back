const Job = require("../models/Job");
const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors");
const mongoose = require("mongoose");
const moment = require("moment");

//get all jobs function will be reviesed to make the search function work
const getAllJobs = async (req, res) => {
  const { search, status, jobType, sort } = req.query;

  const queryObject = {
    createdBy: req.user.userId,
  };

  if (search) {
    queryObject.position = { $regex: search, $options: "i" };
  }
  if (status && status !== "all") {
    queryObject.status = status;
  }
  if (jobType && jobType !== "all") {
    queryObject.jobType = jobType;
  }
  let result = Job.find(queryObject);

  if (sort === "latest") {
    result = result.sort("-createdAt");
  }
  if (sort === "oldest") {
    result = result.sort("createdAt");
  }
  if (sort === "a-z") {
    result = result.sort("position");
  }
  if (sort === "z-a") {
    result = result.sort("-position");
  }

  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  result = result.skip(skip).limit(limit);

  const jobs = await result;

  const totalJobs = await Job.countDocuments(queryObject);
  const numOfPages = Math.ceil(totalJobs / limit);

  res.status(StatusCodes.OK).json({ jobs, totalJobs, numOfPages });
};
//get job by id
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
//create job
const createJob = async (req, res) => {
  req.body.createdBy = req.user.userId;
  const job = await Job.create(req.body);
  res.status(StatusCodes.CREATED).json({ job });
};
//update job
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
//delete job
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
