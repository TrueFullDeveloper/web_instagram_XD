import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// FAKE DATA BEGIN
import fakeUserPhoto from "../../static/images/fakeImages/fakeUserPhoto.jpg";

const userData = {
  userPhoto: fakeUserPhoto,
  userName: "Sergio",
  email: "wannakillms@gmail.com",
  userInformation: "Hi, I am from Russia, I am professional event manager! :D",
  phoneNumber: "8-(960)-906-10-87",
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

export const profileUpdate = createAsyncThunk(
  "profile/profileUpdate",
  async (userUpdateData, userId) => {
    try {
      await axios.post(
        "https://jsonplaceholder.typicode.com/posts",
        JSON.stringify(userUpdateData)
      );

      const payload = { ...userUpdateData, userPhoto: userData.userPhoto }; // Here Should be Photo url from Server

      return payload;
    } catch (err) {
      console.log(err.message);
    }
  }
);

const profileSlice = createSlice({
  name: "profile",
  initialState: {
    profileData: {
      userPhoto: null,
      userName: null,
      email: null,
      userInformation: null,
      phoneNumber: null,
      instagram: null,
      facebook: null,
      vkontacte: null,
      userRepostList: [],
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

export const selectUserName = state => state.profile.profileData.userName;

export default profileSlice.reducer;
