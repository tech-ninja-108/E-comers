import { Router } from "express";
import {
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

const router = Router();

router.post("/register", registerValidator, userRegister);
router.post("/login", loginValidator, userLogin);
router.post("/me", meValidator, userMe);
router.post("/refresh-token", refreshToken);

export default router;
