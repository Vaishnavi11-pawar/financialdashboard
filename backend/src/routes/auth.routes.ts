import express from 'express';
import { registerUser, loginUser, refreshAccessToken, logoutUser, } from '../controllers/auth.controller';
import { asyncHandler } from '../utils/asyncHandler';
import { upload } from "../middleware/multer.middleware";
import { verifyJWT } from "../middleware/auth.middleware";


const router = express.Router();

// router.post('/auth/register', registerUser);
router.post('/auth/register', upload.fields([{ name: 'avatar', maxCount: 1 }]), registerUser);
router.post('/auth/login', loginUser);
router.post("/auth/refresh", refreshAccessToken);
router.post("/auth/logout", verifyJWT, logoutUser);

export default router;
