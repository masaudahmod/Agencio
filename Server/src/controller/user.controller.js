import { User } from "../model/user.shcema.js";
import { ApiError } from "../utils/ApiErrors.js";
import { ApiSuccess } from "../utils/ApiSuccess.js";

const generateTokens = async (_id) => {
  try {
    const user = await User.findById(_id);
    if (!user) {
      throw new ApiError(404, "User not found");
    }
    const accessToken = await user.accessTokenGenerate();
    const refreshToken = await user.refreshTokenGenerate();
    user.refreshToken = refreshToken;
    await user.save();
    return { accessToken, refreshToken };
  } catch (error) {
    console.log("generateTokens", error);
    throw new ApiError(500, "Internal server error");
  }
};

const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new ApiError(400, "User already exists");
    }
    if (!name || !email || !password) {
      throw new ApiError(400, "All fields are required");
    }
    const user = await User.create({
      name,
      email,
      password,
      role: "designer",
    });
    // res.status(201).json({
    //   message: "User created successfully",
    //   user: {
    //     _id: user._id,
    //     name: user.name,
    //     email: user.email,
    //     role: user.role,
    //   },
    // });

    return res.json(
      new ApiSuccess(
        201,
        "User created successfully. ",
        { user }
      )
    );
  } catch (error) {
    console.log("createUser", error);
    return res
      .status(error.status || 500)
      .json({ message: error.message || "Internal server error" });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      throw new ApiError(400, "Email and password are required");
    }
    const isUser = await User.findOne({ email });
    if (!isUser) {
      throw new ApiError(404, "User not found");
    }
    const isPasswordCorrect = await isUser.isPasswordCorrect(password);
    if (!isPasswordCorrect) {
      throw new ApiError(401, "Invalid password");
    }

    const user = await User.findOne({ email })
      .select("-password -refreshToken")
      .populate("role");

    const { accessToken, refreshToken } = await generateTokens(user._id);

    const options = {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    };

    console.log(`User: ${user.name} Logged In`);

    res
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", refreshToken, options);

    // res.status(200).json({
    //   message: "User logged in successfully",
    //   user: {
    //     _id: user._id,
    //     name: user.name,
    //     email: user.email,
    //     role: user.role,
    //   },
    //   accessToken,
    //   refreshToken,
    // });

    return res.json(
      new ApiSuccess(200, "Login successful", {
        user: user,
        accessToken,
        refreshToken,
      })
    );
  } catch (error) {
    console.log("error in loginUser", error);
    return res
      .status(error.status || 500)
      .json({ message: error.message || "Internal server error" });
  }
};

const logoutUser = async (req, res) => {
  try {
    // const userId = req.user._id;
    // const user = await User.findById(userId);

    // if (!user) {
    //   throw new ApiError(404, "User not found");
    // }
    // user.refreshToken = null;
    // await user.save();
    // res.clearCookie("refreshToken", {
    //   httpOnly: true,
    //   secure: true,
    //   sameSite: "strict",
    // });
    // res.clearCookie("accessToken", {
    //   httpOnly: true,
    //   secure: true,
    //   sameSite: "strict",
    // });

    await User.findByIdAndUpdate(req.user._id, {
      $set: { refreshToken: null },
    });

    res.clearCookie("accessToken");
    res.clearCookie("refreshToken");
    console.log(`User: ${req.user.name} Logged Out`);
    return res.json(new ApiSuccess(200, "Logout successful", {}));
  } catch (error) {
    console.log("error in logoutUser", error);
    return res
      .status(error.status || 500)
      .json({ message: error.message || "Internal server error" });
  }
};

const getUser = async (req, res) => {
  try {
    const { userId } = req;
    const user = await User.findById(userId).select("-password -refreshToken");
    if (!user) {
      throw new ApiError(404, "User not found");
    }
    res.status(200).json(user);
  } catch (error) {
    console.log("error in getUser", error);
    return res
      .status(error.status || 500)
      .json({ message: error.message || "Internal server error" });
  }
};

export { registerUser, loginUser, logoutUser, generateTokens, getUser };
