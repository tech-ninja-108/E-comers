import { createSlice } from "@reduxjs/toolkit";
import { loginUser } from "./thunkAuth";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
    isLogin: false,
    isLoading: true,
  },
  reducers: {
    userLogin: (state, action) => {
      state.user = action.payload;
      state.isLogin = true;
      state.isLoading = false;
    },
    userLogout: (state) => {
      state.user = null;
      state.isLoading = false;
      state.isLogin = false;
    },
  },
  extraReducers: (bundiler) => {
    bundiler
      .addCase(loginUser.pending, (state) => {
        ((state.isLoading = true), (state.isLogin = false));
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        ((state.user = action.payload),
          (state.isLoading = false),
          (state.isLogin = true));
      })
      .addCase(loginUser.rejected, (state) => {
        ((state.isLoading = false), (state.isLogin = false));
      });
  },
});

export const { userLogout, userLogin } = userSlice.actions;
export default userSlice.reducer;
