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

export const fetchUser = createAsyncThunk("user/fetchUser", async userId => {
  try {
    const res = await axios.get("https://jsonplaceholder.typicode.com/todos/?_start=0&_limit=5");

    const payload = { ...userData }; // Here Should be res from Server

    return payload;
  } catch (err) {
    console.log(err.message);
  }
});

const userSlice = createSlice({
  name: "user",
  initialState: {
    userData: {
      userPhoto: null,
      userName: null,
      email: null,
      userInformation: null,
      phoneNumber: null,
      instagram: null,
      facebook: null,
      vkontacte: null,
    },
    loading: false,
  },

  extraReducers: {
    [fetchUser.pending]: state => {
      state.loading = true;
    },

    [fetchUser.fulfilled]: (state, { payload }) => {
      state.userData = payload;
      state.loading = false;
    },
  },
});

export const selectUserLoading = state => state.user.loading;

export const selectUser = state => state.user.userData;

export default userSlice.reducer;
