import bcrypt from "bcrypt";
import userModel from "../models/user.model.js";
import {
  CreateToken,
  verifyAccessToken,
  verifyRefreshToken,
} from "../util/auth.token.js";
//user register API
const userRegister = async (req, res) => {
  const { email, name, password, conformpassword } = req.body;
  const isExistUser = await userModel.findOne({ email });

  if (isExistUser) {
    return res.status(409).json({
      message: "User allready register",
      errors: [
        {
          type: "field",
          msg: "User allready register",
        },
      ],
    });
  }

  if (password != conformpassword) {
    return res.status(400).json({
      message: "passseord and conformpasswor dos not match",
    });
  }

  const user = await userModel.create({
    email,
    name,
    passwordHash: await bcrypt.hash(password, 10),
  });

  const { ACCESS_TOKEN, REFRESH_TOKEN } = CreateToken(user._id, user.role);
  res.cookie("refreshToken", REFRESH_TOKEN, {
    httpOnly: true,
  });

  user.refreshToken = REFRESH_TOKEN;
  await user.save();
  res.cookie("refreshToken", REFRESH_TOKEN, {
    httpOnly: true,
    secure: false,
    sameSite: "lax",
    path: "/",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });
  res.status(201).json({
    message: "User register successfully",
    data: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
    accessToken: ACCESS_TOKEN,
  });
};

//user logi API
const userLogin = async (req, res) => {
  const { email, password } = req.body;
  const isExistUser = await userModel.findOne({ email });
  if (
    !isExistUser ||
    !(await bcrypt.compare(password, isExistUser.passwordHash))
  ) {
    return res.status(400).json({
      message: "Entered email or passwor most be incorrect",
      errors: [
        {
          type: "field",
          msg: "Entered email or passwor most be incorrect",
        },
      ],
    });
  }

  const { ACCESS_TOKEN, REFRESH_TOKEN } = CreateToken(
    isExistUser._id,
    isExistUser.role,
  );

  isExistUser.refreshToken = REFRESH_TOKEN;
  await isExistUser.save();

  res.cookie("refreshToken", REFRESH_TOKEN, {
    httpOnly: true,
    secure: false,
    sameSite: "lax",
    path: "/",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  res.status(200).json({
    message: "User login successfully",
    data: {
      id: isExistUser._id,
      name: isExistUser.name,
      email: isExistUser.email,
      role: isExistUser.role,
    },
    accessToken: ACCESS_TOKEN,
  });
};

//user me API
const userMe = async (req, res) => {
  const { authorization } = req.headers;
  const decode = verifyAccessToken(authorization);

  if (!decode) {
    return res.status(401).json({
      message: "invalid accessToken",
      errors: [
        {
          type: "filed",
          msg: "invalid accessToken",
        },
      ],
    });
  }
  const user = await userModel.findById(decode.id);
  if (!user) {
    return res.status(404).json({
      message: "User not found",
      errors: [
        {
          type: "filed",
          msg: "User not found",
        },
      ],
    });
  }

  res.status(200).json({
    message: "User found successfully",
    data: {
      name: user.name,
      email: user.email,
      id: user._id,
      role: user.role,
    },
    accessToken: authorization,
  });
};

const refreshToken = async (req, res) => {
  const { refreshToken } = req.cookies;

  if (!refreshToken) {
    return res.status(400).json({
      message: "RefreshToken is required",
      errors: [
        {
          type: "filed",
          msg: "RefreshToken is required",
        },
      ],
    });
  }

  const decode = verifyRefreshToken(refreshToken);
  if (!decode) {
    return res.status(401).json({
      message: "invalid refreshToken",
      errors: [
        {
          type: "filed",
          msg: "invalid accessToken",
        },
      ],
    });
  }

  const user = await userModel.findById(decode.id);
  if (!user) {
    return res.status(404).json({
      message: "User not found",
      errors: [
        {
          type: "filed",
          msg: "User not found",
        },
      ],
    });
  }
  if (refreshToken !== user.refreshToken) {
    user.refreshToken = null;
    await user.save();
    return res.status(400).json({
      message: "refreshToken mishmatch",
      errors: [
        {
          type: "filed",
          msg: "refreshToken mishmatch",
        },
      ],
    });
  }

  const { ACCESS_TOKEN, REFRESH_TOKEN } = CreateToken(user._id, user.role);
  user.refreshToken = REFRESH_TOKEN;
  await user.save();
  res.cookie("refreshToken", REFRESH_TOKEN, {
    httpOnly: true,
    secure: false, // localhost par HTTP
    sameSite: "lax",
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  });

  res.status(200).json({
    message: "Token refreshed successfully",
    data: {
      name: user.name,
      email: user.email,
      id: user._id,
      role: user.role,
    },
    accessToken: ACCESS_TOKEN,
  });
};

const logoutUser = async (req, res) => {
  // Database se refresh token bhi remove karo
  if (req.user?._id) {
    const user = await userModel.findById(req.user._id);

    if (user) {
      user.refreshToken = null;
      await user.save();
    }
  }

  // Browser se refresh token cookie clear karo
  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: false,
    sameSite: "lax",
    path: "/",
  });

  return res.status(200).json({
    success: true,
    message: "Logout successfully",
  });
};

export { userRegister, userLogin, userMe, refreshToken, logoutUser };
