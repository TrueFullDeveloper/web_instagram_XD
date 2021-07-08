import { configureStore } from "@reduxjs/toolkit";
// API Reducers
import authReducer from "./api/authSlice";
import passwordResetReducer from "./api/passwordResetSlice";
import newsReducer from "./api/newsSlice";
import eventReducer from "./api/eventSlice";
import profileReducer from "./api/profileSlice";
import userReducer from "./api/userSlice";
import userListReducer from "./api/userListSlice";
import repostReducer from "./api/repostSlice";

export default configureStore({
  reducer: {
    // Reducers with API
    auth: authReducer,
    passwordReset: passwordResetReducer,
    news: newsReducer,
    event: eventReducer,
    profile: profileReducer,
    user: userReducer,
    userList: userListReducer,
    repost: repostReducer,
  },
});
