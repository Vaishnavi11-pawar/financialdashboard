import { Request, Response } from "express";
import { IUserDocument, UserModel, getUserById } from "../models/user.model";
import { ApiResponse } from "../utils/ApiResponse";
import { asyncHandler } from "../utils/asyncHandler";
import { uploadOnCloudinary, deleteFromCloudinary } from "../utils/cloudinary";
import jwt from "jsonwebtoken";

interface MulterRequest extends Request {
  files?: {
    [fieldname: string]: Express.Multer.File[];
  };
}

export const generateAccessAndRefreshToken = async (userId: string) => {
  const user = await getUserById(userId) as IUserDocument | null;
  if (!user) {
    throw new Error("User not found");
  }
  const accessToken = user.generateAccessToken();
  const refreshToken = user.generateRefreshToken();

  user.refreshToken = refreshToken;
  await user.save({ validateBeforeSave: false });

  return { accessToken, refreshToken };
};

export const registerUser = asyncHandler(async (req: MulterRequest, res: Response) => {
  const { fullname, email, username, password } = req.body;

  if ([fullname, username, email, password].some((field) => !field || field.trim() === "")) {
    return res.status(400).json(new ApiResponse(400, null, "All fields are required"));
  }

  const existedUser = await UserModel.findOne({
    $or: [{ username }, { email }],
  });

  if (existedUser) {
    return res.status(400).json(new ApiResponse(400, null, "User with email or username already exists"));
  }

  // Handle avatar upload
  const avatarLocalPath = req.files?.avatar?.[0]?.path;
  if (!avatarLocalPath) {
    return res.status(400).json(new ApiResponse(400, null, "Avatar file is missing"));
  }

  let avatar: any;
  try {
    avatar = await uploadOnCloudinary(avatarLocalPath);
    if (!avatar?.url && !avatar?.secure_url) throw new Error("Cloudinary upload failed");
  } catch (error) {
    return res.status(500).json(new ApiResponse(500, null, "Failed to upload avatar"));
  }

  try {
    const user = await UserModel.create({
      fullname,
      email,
      username: username.toLowerCase(),
      password,
      avatar: avatar.secure_url || avatar.url,
    });
    const createdUser = await UserModel.findById(user._id).select("-password -refreshToken");

    if (!createdUser) {
      // Clean up avatar from Cloudinary if user creation fails
      if (avatar?.public_id) await deleteFromCloudinary(avatar.public_id);
      return res.status(500).json(new ApiResponse(500, null, "Something went wrong while registering a user"));
    }

    const { accessToken, refreshToken } = await generateAccessAndRefreshToken(user._id.toString());

    const options = {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
    };

    return res
      .status(200)
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", refreshToken, options)
      .json(new ApiResponse(200, createdUser, "User registered successfully"));
  } catch (error) {
    // Clean up avatar from Cloudinary if user creation fails
    if (avatar?.public_id) {
      await deleteFromCloudinary(avatar.public_id);
    }
    return res.status(500).json(new ApiResponse(500, null, "Something went wrong while registering a user and avatar was deleted"));
  }
});


export const loginUser = asyncHandler(async (req: Request, res: Response) => {
  const { email, username, password } = req.body;

  if ((!email && !username) || !password) {
    return res.status(400).json(new ApiResponse(400, null, "Email/username and password are required"));
  }

  const user = await UserModel.findOne({
    $or: [{ username }, { email }],
  }).select("+password +refreshToken") as IUserDocument | null;

  if (!user) {
    return res.status(404).json(new ApiResponse(404, null, "User not found"));
  }

  const isPasswordValid = await user.isPasswordCorrect(password);
  if (!isPasswordValid) {
    return res.status(400).json(new ApiResponse(400, null, "Invalid password"));
  }

  const { accessToken, refreshToken } = await generateAccessAndRefreshToken(user._id.toString());

  const loggedInUser = await UserModel.findById(user._id).select("-password -refreshToken");

  const options = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
  };

  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(new ApiResponse(200, loggedInUser, "User logged in successfully"));
});


export const refreshAccessToken = asyncHandler(async (req: Request, res: Response) => {
  const incomingRefreshToken = req.cookies?.refreshToken || req.body.refreshToken;
  if (!incomingRefreshToken) {
    return res.status(401).json(new ApiResponse(401, null, "Refresh Token is required"));
  }

  let user: IUserDocument | null = null;
  try {
    const decoded = jwt.verify(
      incomingRefreshToken,
      process.env.REFRESH_TOKEN_SECRET as string
    ) as { _id?: string };

    user = decoded._id ? await UserModel.findById(decoded._id) : null;
    if (!user || incomingRefreshToken !== user.refreshToken) {
      return res.status(401).json(new ApiResponse(401, null, "Invalid Refresh Token"));
    }

    const { accessToken, refreshToken: newRefreshToken } =
      await generateAccessAndRefreshToken(user._id.toString());

    const options = {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
    };

    return res
      .status(200)
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", newRefreshToken, options)
      .json(
        new ApiResponse(
          200,
          { accessToken, refreshToken: newRefreshToken },
          "Access Token refreshed successfully"
        )
      );
  } catch (error: any) {
    return res.status(500).json(
      new ApiResponse(
        500,
        null,
        error?.message || "Something went wrong while refreshing access token"
      )
    );
  }
});

// Extend Express Request to include user
interface AuthRequest extends Request {
  user?: {
    _id: string;
    [key: string]: any;
  };
}

export const logoutUser = asyncHandler(async (req: AuthRequest, res: Response) => {
  await UserModel.findByIdAndUpdate(
    req.user?._id,
    {
      $unset: {
        refreshToken: "",
      },
    },
    { new: true }
  );

  const options = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
  };

  return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, null, "User logged out successfully"));
});