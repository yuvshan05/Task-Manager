import { Router } from "express";
import { changeCurrentPassword, loginUser, logoutUser, registerUser, updateUserDetails } from "../controllers/user.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/register").post(registerUser)
router.route("/login").post(loginUser)
router.route("/logout").post(verifyJWT,  logoutUser)
//patch se selected hi update hoga warna sab ho jayega
router.route("/update-account").patch(verifyJWT,  updateUserDetails)
router.route("/update-password").patch(verifyJWT,  changeCurrentPassword)

export default router;