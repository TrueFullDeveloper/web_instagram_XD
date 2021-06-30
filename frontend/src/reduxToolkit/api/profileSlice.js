import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// FAKE DATA BEGIN
import fakeUserPhoto from "../../static/images/fakeImages/fakeUserPhoto.jpg";

const userData = {
  userPhoto: fakeUserPhoto,
  userName: "Sergio",
  email: "wannakillms@gmail.com",
  userInformation: "Hi, I am from Russia, I am professional event manager! :D",
  contactInformation: [
    { communicationWay: "Email", contact: "wannakillms@gmail.com" },
    { communicationWay: "Телефон", contact: "8-(960)-906-10-87" },
  ],
};
// FAKE DATA BEGIN

export const fetchProfile = createAsyncThunk("profile/fetchProfile", async userId => {
  try {
    const res = await axios.get("https://jsonplaceholder.typicode.com/todos/?_start=0&_limit=5");

    const payload = { ...userData }; // Here Should be res from Server

    return payload;
  } catch (err) {
    console.log(err.message);
  }
});

export const profileUpdate = createAsyncThunk("profile/profileUpdate", async (userData, userId) => {
  try {
    await axios.post("https://jsonplaceholder.typicode.com/posts", JSON.stringify(userData));

    const payload = { ...userData };

    return payload;
  } catch (err) {
    console.log(err.message);
  }
});

const profileSlice = createSlice({
  name: "profile",
  initialState: {
    profileData: {
      userPhoto: "",
      userName: "",
      email: "",
      userInformation: "",
      contactInformation: [],
    },
    loading: false,
  },

  extraReducers: {
    [fetchProfile.pending]: state => {
      state.loading = true;
    },

    [fetchProfile.fulfilled]: (state, { payload }) => {
      state.profileData = payload;
      state.loading = false;
    },

    [profileUpdate.pending]: state => {
      state.loading = true;
    },

    [profileUpdate.fulfilled]: (state, { payload }) => {
      state.profileData = payload;
      state.loading = false;
    },
  },
});

export const selectProfileLoading = state => state.profile.loading;

export const selectProfile = state => state.profile.profileData;

export default profileSlice.reducer;
