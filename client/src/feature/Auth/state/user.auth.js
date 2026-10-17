import { createSlice } from "@reduxjs/toolkit";
import { authme, loginUser } from "./thunkAuth";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
    isLoading: true,
    errors: null,
    accessToken: null,
  },
  reducers: {
    userLogin: (state, action) => {
      state.user = action.payload;
      state.isLogin = true;
      state.isLoading = false;
    },
    setAccessToken: (state, action) => {
      state.accessToken = action.payload;
    },
    userLogout: (state) => {
      state.user = null;
      state.isLoading = false;
      state.isLogin = false;
      state.accessToken = null;
    },
  },
  extraReducers: (bundiler) => {
    bundiler
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.accessToken = action.payload?.accessToken;
        state.isLoading = false;
      })
      .addCase(loginUser.rejected, (state, action) => {
        ((state.isLoading = false),
          (state.errors =
            action.payload?.message ||
            action.payload?.errors?.[0]?.msg ||
            action.error?.message ||
            "Something went wrong"));
      })
      .addCase(authme.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(authme.fulfilled, (state, action) => {
        state.user = action.payload;
        state.accessToken = action.payload?.accessToken;
        state.isLoading = false;
      })
      .addCase(authme.rejected, (state, action) => {
        ((state.isLoading = false),
          (state.errors =
            action.payload?.message ||
            action.payload?.errors?.[0]?.msg ||
            action.error?.message ||
            "Something went wrong"));
      });
  },
});

export const { userLogout, userLogin, setAccessToken } = userSlice.actions;
export default userSlice.reducer;
