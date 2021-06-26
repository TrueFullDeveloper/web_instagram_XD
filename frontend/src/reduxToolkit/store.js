import { configureStore } from "@reduxjs/toolkit";
// API Reducers
import authReducer from "./api/authSlice";
import passwordResetReducer from "./api/passwordResetSlice";

export default configureStore({
  reducer: {
    // Reducers with API
    auth: authReducer,
    passwordReset: passwordResetReducer,
  },
});
