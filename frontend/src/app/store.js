import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";

//for any reducer created bring here:
export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});
