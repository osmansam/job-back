const Profile = require("../models/Profile");
const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors");

const getProfile = async (req, res) => {
  const profile = await Profile.findOne({ createdBy: req.user.userId });
  if (!profile) {
    throw new CustomError.NotFoundError("Profile not found");
  }
  res.status(StatusCodes.OK).json({ profile });
};

const createProfile = async (req, res) => {
  const profile = await Profile.create({
    ...req.body,
    createdBy: req.user.userId,
  });
  res.status(StatusCodes.CREATED).json({ profile });
};

const updateProfile = async (req, res) => {
  const profile = await Profile.findOneAndUpdate(
    { user: req.user.id },
    req.body,
    { new: true, runValidators: true }
  );
  if (!profile) {
    throw new CustomError.NotFoundError("Profile not found");
  }
  res.status(StatusCodes.OK).json({ profile });
};

const deleteProfile = async (req, res) => {
  const profile = await Profile.findOneAndDelete({ user: req.user.id });
  if (!profile) {
    throw new CustomError.NotFoundError("Profile not found");
  }
  res.status(StatusCodes.OK).json({ profile });
};

module.exports = {
  getProfile,
  createProfile,
  updateProfile,
  deleteProfile,
};
