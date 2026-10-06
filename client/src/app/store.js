import { configureStore } from "@reduxjs/toolkit";
import Authslice from "../feature/Auth/state/user.auth";

export const store = configureStore({
  reducer: {
    auth: Authslice,
  },
});
