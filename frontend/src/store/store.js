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
import chatReducer from "./api/chatSlice";
import chatListReducer from "./api/chatListSlice";

export default configureStore({
  reducer: {
    chat: chatReducer,
    // Reducers with API
    chatList: chatListReducer,
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
