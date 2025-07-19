import { Business } from "../model/business.schema.js";
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
// const getBusinessById = catchAsync(async (req, res, next) => {
//   const business = await Business.findById(req.params.id).populate(
//     "createdBy assignedTeam.assignBy assignedTeam.campaignCoordinator",
//     "name email"
//   );

//   if (!business) return next(new AppError("Business not found", 404));

//   res.status(200).json({ success: true, data: business });
// });

// // ✅ Update
// const updateBusiness = catchAsync(async (req, res, next) => {
//   const updated = await Business.findByIdAndUpdate(req.params.id, req.body, {
//     new: true,
//   });

//   if (!updated) return next(new AppError("Business not found", 404));

//   res.status(200).json({ success: true, data: updated });
// });

// // ✅ Delete
// const deleteBusiness = catchAsync(async (req, res, next) => {
//   const deleted = await Business.findByIdAndDelete(req.params.id);
//   if (!deleted) return next(new AppError("Business not found", 404));

//   res.status(204).json({ success: true, message: "Business deleted" });
// });

export {
  createBusiness,
  // getBusinessById,
  // updateBusiness,
  // deleteBusiness,
  getAllBusinesses,
};
