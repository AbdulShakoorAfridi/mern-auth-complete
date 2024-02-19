import express from 'express';
import {
     loginUser,
     registerUser,
     logoutUser,
     userProfile,
     updateUserProfile

} from '../controllers/userController.js';
import { protect } from '../middlewares/authMiddleware.js';
const router = express.Router();

router.post("/login", loginUser);
router.post("/register", registerUser);
router.post("/logout", logoutUser);
router.route("/profile").get(protect, userProfile).patch(protect,updateUserProfile);
// router.route("/profile/:_id")

export default router;