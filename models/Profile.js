const mongoose = require("mongoose");

const ProfileSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide name"],
      maxlength: 50,
    },
    lastName: {
      type: String,
      required: [true, "Please provide last name"],
      maxlength: 50,
    },
    email: {
      type: String,
      required: [true, "Please provide email"],
      maxlength: 50,
    },
    phone: {
      type: String,
      required: [true, "Please provide phone"],
      maxlength: 50,
    },
    address: {
      type: String,
      required: [true, "Please provide address"],
      maxlength: 200,
    },
    city: {
      type: String,
      required: [true, "Please provide city"],
      maxlength: 50,
    },
    country: {
      type: String,
      required: [true, "Please provide country"],
      maxlength: 50,
    },
    zipCode: {
      type: String,
      required: [true, "Please provide zip code"],
      maxlength: 50,
    },

    degree: {
      type: String,
      enum: ["bachelor", "master", "phd"],
      default: "bachelor",
    },
    field: {
      type: String,
      enum: [
        "computer science",
        "mathematics",
        "physics",
        "chemistry",
        "biology",
        "engineering",
        "education",
        "other",
      ],
      default: "computer science",
    },
    university: {
      type: String,
      required: [true, "Please provide university"],
      maxlength: 50,
    },
    graduationYear: {
      type: Number,
      required: [true, "Please provide graduation year"],
      maxlength: 50,
    },
    skills: {
      type: String,
      required: [true, "Please provide skills"],
      maxlength: 50,
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: [true, "Please provide user"],
    },
    isEditing: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Profile", ProfileSchema);
