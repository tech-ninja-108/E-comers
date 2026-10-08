import { createAsyncThunk } from "@reduxjs/toolkit";
import { axioxApi } from "../../../config/api";

export const loginUser = createAsyncThunk(
  "/auth/login",
  async (credintail, thunkApi) => {
    try {
      const res = await axioxApi.post("/auth/login", credintail);
      return res.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error);
    }
  },
);
