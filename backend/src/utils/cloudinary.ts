import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';
import dotenv from 'dotenv';

dotenv.config();

// configure cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const uploadOnCloudinary = async (localFilePath: string): Promise<any> => {
  try {
    if (!localFilePath) return null;
    const response = await cloudinary.uploader.upload(localFilePath, { resource_type: "auto" });
    console.log("File uploaded on cloudinary. file src: " + response.url);
    fs.unlinkSync(localFilePath);
    return response;
  } catch (error: any) {
    if (fs.existsSync(localFilePath)) fs.unlinkSync(localFilePath);
    console.error("Error uploading to cloudinary:", error?.message || error);
    return null;
  }
};

export const deleteFromCloudinary = async (publicId: string): Promise<any> => {
  try {
    const result = await cloudinary.uploader.destroy(publicId);
    console.log("Deleted from cloudinary.");
    return result;
  } catch (error: any) {
    console.log("Error deleting from cloudinary", error?.message || error);
    return null;
  }
};