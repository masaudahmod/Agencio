import mongoose, { model, Schema } from "mongoose";
import { emailValidator } from "../utils/validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {
  ACCESSTOKEN_SECRET,
  JWT_SECRET,
  REFRESHTOKEN_SECRET,
} from "../constant";

const userSchema = new Schema(
  {
    name: { type: String, required: [true, "Name is required"], trim: true },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      validate: {
        validator: emailValidator,
        message: "Invalid E-mail",
      },
    },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ["superAdmin", "cm", "developer", "designer", "marketer"],
      default: "designer",
    },
    emailVerified: Date,
    refreshToken: String,
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  try {
    if (!this.isModified("password")) {
      return next();
    }
    this.password = await bcrypt.hash(this.password, 10);
  } catch (error) {
    console.log("error", error);
    next(error);
  }
});

userSchema.methods.isPasswordCorrect = async function (password) {
  try {
    return await bcrypt.compare(password, this.password);
  } catch (error) {
    console.log("error", error);
    throw error;
  }
};

userSchema.methods.mailVerificationToken = function () {
  try {
    return jwt.sign(
      {
        _id: this._id,
        email: this.email,
      },
      JWT_SECRET,
      { expiresIn: "10m" }
    );
  } catch (error) {
    console.log("error in mailVerificationToken", error);
  }
};

userSchema.methods.accessTokenGenerate = function () {
  try {
    return jwt.sign(
      {
        _id: this._id,
        email: this.email,
        role: this.role,
      },
      ACCESSTOKEN_SECRET,
      { expiresIn: "1d" }
    );
  } catch (error) {
    console.log("error in accessTokenGenerate", error);
  }
};

userSchema.methods.refreshTokenGenerate = function () {
  try {
    return jwt.sign(
      {
        _id: this._id,
        email: this.email,
        role: this.role,
      },
      REFRESHTOKEN_SECRET,
      { expiresIn: "7d" }
    );
  } catch (error) {
    console.log("error in refreshTokenGenerate", error);
  }
};

export const User = mongoose.models.User || model("User", userSchema);
