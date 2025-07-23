import { Business } from "../model/business.schema.js";
import { Content } from "../model/content.schema.js";
import { User } from "../model/user.shcema.js";
import { ApiError } from "../utils/ApiErrors.js";
import { ApiSuccess } from "../utils/ApiSuccess.js";

const createContent = async (req, res, next) => {
  try {
    const {
      business,
      assignedTo,
      name,
      captionBox,
      posterText,
      priority,
      vision,
      tags,
      status,
      comment,
    } = req.body;

    if (!business || !name) {
      throw new ApiError(400, "Business, Name, and Date are required");
    }

    if (business) {
      const businessExists = await Business.findById(business);
      if (!businessExists) {
        throw new ApiError(404, "Business not found");
      }
    }

    if (assignedTo) {
      const user = await User.findById(assignedTo);
      if (!user) throw new ApiError(404, "Assigned user not found");
    }

    const newContent = new Content({
      business,
      createdBy: req.user?._id || req.userId,
      assignedTo: assignedTo || null,
      name,
      captionBox,
      posterText,
      priority,
      vision,
      tags,
      status,
      comments: {
        user: req.user?._id || req.userId,
        comment: comment || "",
        date: new Date(),
      },
    });

    const savedContent = await newContent.save();

    res.status(201).json(
      new ApiSuccess(201, "Content created successfully", {
        content: savedContent,
      })
    );
  } catch (error) {
    console.error("Error in createContent:", error.message);
    next(error);
  }
};

// 📅 Get Content by Date
const getContentByDate = async (req, res, next) => {
  try {
    const { date } = req.query;
    if (!date) throw new ApiError(400, "Date query is required");

    const parsedDate = new Date(date);
    if (isNaN(parsedDate)) throw new ApiError(400, "Invalid date format");

    const contents = await Content.find({
      createdAt: {
        $gte: new Date(parsedDate.setHours(0, 0, 0, 0)),
        $lte: new Date(parsedDate.setHours(23, 59, 59, 999)),
      },
    }).populate("business", "businessName");

    if (!contents.length) {
      return res
        .status(200)
        .json(new ApiSuccess(200, "No content found on selected date", []));
    }

    res
      .status(200)
      .json(new ApiSuccess(200, "Content found for the date", contents));
  } catch (error) {
    console.error("Error in getContentByDate:", error);
    next(error);
  }
};

const getAllContent = async (req, res, next) => {
  try {
    const contents = await Content.find()
      .populate("business", "name")
      .populate("assignedTo", "name");
    res
      .status(200)
      .json(
        new ApiSuccess(200, "All content fetched successfully", { contents })
      );
  } catch (error) {
    console.error("Error in getAllContent:", error);
    next(error);
  }
};

const updateContent = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!id) throw new ApiError(400, "Content ID is required");

    const updateData = req.body;

    if (Object.keys(updateData).length === 0) {
      throw new ApiError(400, "No data provided to update");
    }

    const updated = await Content.findByIdAndUpdate(
      id,
      { $set: updateData },
      { new: true, runValidators: true }
    );

    if (!updated) throw new ApiError(404, "Content not found");

    res
      .status(200)
      .json(new ApiSuccess(200, "Content updated successfully", updated));
  } catch (error) {
    console.error("Error in updateContent:", error);
    next(error);
  }
};

const deleteContent = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!id) throw new ApiError(400, "Content ID is required");

    const deleted = await Content.findByIdAndDelete(id);
    if (!deleted) throw new ApiError(404, "Content not found");

    res
      .status(200)
      .json(new ApiSuccess(200, "Content deleted successfully", deleted));
  } catch (error) {
    console.error("Error in deleteContent:", error);
    next(error);
  }
};

export {
  createContent,
  getContentByDate,
  getAllContent,
  updateContent,
  deleteContent,
};
