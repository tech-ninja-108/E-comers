import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    name: "",
    email: "",
    role: "",
    isLogin: false,
    isLoading: true,
  },
  reducers: {
    userLogin: (state, action) => {
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.role = action.payload.role;
      state.isLogin = true;
      state.isLoading = false;
    },
  },
});
