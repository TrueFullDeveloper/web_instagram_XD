import { configureStore } from "@reduxjs/toolkit";
// API Reducers
import authReducer from "./api/authSlice";
import passwordResetReducer from "./api/passwordResetSlice";
import newsReducer from "./api/newsSlice";

export default configureStore({
  reducer: {
    // Reducers with API
    auth: authReducer,
    passwordReset: passwordResetReducer,
    news: newsReducer,
  },
});
