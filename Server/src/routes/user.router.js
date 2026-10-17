import { Router } from "express";
import {
  logoutUser,
  refreshToken,
  userLogin,
  userMe,
  userRegister,
} from "../controller/user.controller.js";
import {
  loginValidator,
  meValidator,
  registerValidator,
} from "../validator/auth.validator.js";
import asyncHandler from "../util/asyncHandler.js";
import findUser from "../middleware/funduser.middleware.js";

const router = Router();

router.post("/register", registerValidator, userRegister);
router.post("/login", loginValidator, userLogin);
router.post("/me", meValidator, userMe);
router.post("/refresh-token", refreshToken);
router.post("/logout", findUser, asyncHandler(logoutUser));

export default router;
