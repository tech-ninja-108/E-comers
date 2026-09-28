import mongoose from "mongoose";

const UserSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  passwordHash: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    default: "user",
    enum: ["user", "seller"],
  },
  refreshToken: {
    type: String,
  },
});

const userModel = new mongoose.model("users", UserSchema);

export default userModel;
