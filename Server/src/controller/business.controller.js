import { Business } from "../model/business.schema.js";
import { ApiError } from "../utils/ApiErrors.js";
import { ApiSuccess } from "../utils/ApiSuccess.js";

// ✅ Create a new business
const createBusiness = async (req, res, next) => {
  try {
    const newBusiness = new Business({
      ...req.body,
      createdBy: req.user._id,
      assignedTeam: {
        assignBy: req.user._id,
        campaignCoordinator: req.user._id,
      },
    });
    await newBusiness.save();
    return res.json(
      new ApiSuccess(201, "Business created successfully.", { newBusiness })
    );
  } catch (error) {
    console.log("error in createBusiness", error);
    next(error);
  }
};

// ✅ Get all businesses
const getAllBusinesses = async (req, res, next) => {
  try {
    const businesses = await Business.find().populate(
      "createdBy assignedTeam.assignBy assignedTeam.campaignCoordinator",
      "name email"
    );
    res
      .status(200)
      .json(
        new ApiSuccess(200, "Businesses fetched successfully", { businesses })
      );
  } catch (error) {
    console.log("error in getAllBusinesses", error);
    next(error);
  }
};

// // ✅ Get single business
const getBusinessById = async (req, res, next) => {
  try {
    const business = await Business.findById(req.params.id).populate(
      "createdBy assignedTeam.assignBy assignedTeam.campaignCoordinator",
      "name email"
    );

    if (!business) return next(new AppError("Business not found", 404));

    res
      .status(200)
      .json(new ApiSuccess(200, "Business fetched successfully", { business }));
  } catch (error) {
    console.log("error in getBusinessById", error);
    next(error);
  }
};

// // ✅ Update
const updateBusiness = async (req, res, next) => {
  try {
    const updateData = req.body;

    if (!updateData || Object.keys(updateData).length === 0) {
      throw new ApiError(400, "No fields provided to update.");
    }

    const updatedBusiness = await Business.findByIdAndUpdate(
      req.params.id,
      { $set: updateData },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedBusiness) {
      return next(new ApiError("Business not found", 404));
    }

    res.status(200).json(
      new ApiSuccess(200, "Business updated successfully", {
        updatedBusiness,
      })
    );
  } catch (error) {
    console.error("Error in updateBusiness:", error);
    next(error);
  }
};


// // ✅ Delete
const deleteBusiness = async (req, res, next) => {
  try {
    const deletedBusiness = await Business.findByIdAndDelete(req.params.id);

    if (!deletedBusiness) return next(new AppError("Business not found", 404));
    res
      .status(200)
      .json(new ApiSuccess(200, "Business deleted successfully", {}));
  } catch (error) {
    console.log("error in deleteBusiness", error);
    next(error);
  }
};

export {
  createBusiness,
  getBusinessById,
  updateBusiness,
  deleteBusiness,
  getAllBusinesses,
};
