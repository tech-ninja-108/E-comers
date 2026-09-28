import userModel from "../models/user.model.js";
import { verifyAccessToken } from "../util/auth.token.js";

const findUser = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    const decode = verifyAccessToken(authorization);
    if (decode == null) {
      return res.status(401).json({
        message: "AccessToken is expired",
      });
    }
    const user = await userModel.findById(decode.id);
    if (!user) {
      return res.status(404).json({
        message: "User not found",
        errors: [
          {
            type: "field",
            msg: "User not found",
          },
        ],
      });
    }
    req.user = user;
    next();
  } catch (error) {
    return res.status(500).json({
      message: "Internal server errors",
    });
  }
};

export default findUser;
