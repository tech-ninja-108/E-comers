import { createAsyncThunk } from "@reduxjs/toolkit";
import { axioxApi } from "../../../config/api";

export const loginUser = createAsyncThunk(
  "/auth/login",
  async (credintail, { rejectWithValue }) => {
    try {
      const { data } = await axioxApi.post("/api/auth/login", credintail);
      const token = data.accessToken;

      if (token) {
        sessionStorage.setItem("accessToken", token);
      }

      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || {
          message: error.message,
        },
      );
    }
  },
);

export const authme = createAsyncThunk(
  "/auth/me",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axioxApi.post("/api/auth/me");
      const token = data.accessToken;

      if (token) {
        sessionStorage.setItem("accessToken", token);
      }
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || {
          message: error.message,
        },
      );
    }
  },
);
