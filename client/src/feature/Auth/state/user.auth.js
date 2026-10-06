import { createSlice } from "@reduxjs/toolkit";

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
  extraReducers:
});


export const {userLogout,userLogin} = userSlice.actions
export default userSlice.reducer