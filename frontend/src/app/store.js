import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import dishReducer from "../features/dishes/dishSlice";

//for any reducer created bring here:
export const store = configureStore({
  reducer: {
    auth: authReducer,
    dishes: dishReducer,
  },
});
