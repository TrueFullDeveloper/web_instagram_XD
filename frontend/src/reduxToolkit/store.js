import { configureStore } from "@reduxjs/toolkit";
// API Reducers
import authReducer from "./api/authSlice";
import passwordResetReducer from "./api/passwordResetSlice";
import newsReducer from "./api/newsSlice";
import eventReducer from "./api/eventSlice";
import profileReducer from "./api/profileSlice";

export default configureStore({
  reducer: {
    // Reducers with API
    auth: authReducer,
    passwordReset: passwordResetReducer,
    news: newsReducer,
    event: eventReducer,
    profile: profileReducer,
  },
});
