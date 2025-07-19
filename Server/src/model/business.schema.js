import mongoose, { model, Schema } from "mongoose";

const businessSchema = Schema(
  {
    businessName: { type: String, required: true },
    typeOfBusiness: String,
    country: String,
    address: String,
    contact: String,
    note: String,
    entryDate: { type: Date, default: Date.now },
    expiredDate: Date,
    package: String,
    imageUrl: String, // later you'll upload to S3 or cloudinary and store the url

    status: {
      type: String,
      enum: ["active", "inactive", "pending"],
      default: "active",
    },

    assignedTeam: {
      team: { type: String }, // optional team name if exists
      assignBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      campaignCoordinator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    },

    socialMedia: {
      facebook: {
        url: String,
        username: String,
        password: String,
      },
      tiktok: {
        url: String,
        username: String,
        password: String,
      },
      instagram: {
        url: String,
        username: String,
        password: String,
      },
      youtube: {
        url: String,
        username: String,
        password: String,
      },
      tripAdvisor: { url: String },
      googleBusiness: { url: String },
      googlePlus: { url: String },
      googlePhoto: { url: String },
      website: { url: String },
    },

    emailCredentials: {
      email: String,
      password: String,
    },

    othersLinks: String,

    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

export const Business =
  mongoose.models.Business || model("Business", businessSchema);
