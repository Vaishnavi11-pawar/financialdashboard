import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { asyncHandler } from "../utils/asyncHandler";
import { UserModel } from "../models/user.model";

// Extend Express Request to include user
declare module "express-serve-static-core" {
  interface Request {
    user?: any;
  }
}

export const verifyJWT = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const token =
    req.cookies?.accessToken ||
    req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const decodedToken = jwt.verify(
      token,
      process.env.ACCESS_TOKEN_SECRET as string
    ) as JwtPayload & { _id?: string };

    const user = await UserModel.findById(decodedToken?._id).select(
      "-password -refreshToken"
    );
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    req.user = user;
    next();
  } catch (error: any) {
    return res.status(401).json({ message: error?.message || "Invalid access token" });
  }
});