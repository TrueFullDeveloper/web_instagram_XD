import { configureStore } from "@reduxjs/toolkit";
// API Reducers
import authReducer from "./api/authSlice";

export default configureStore({
  reducer: {
    // Reducers with API
    auth: authReducer,
  },
});
