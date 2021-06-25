import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const storageName = "UserData"; // TODO: Transfer it to Constants.js

export const fetchLogin = createAsyncThunk(
  "auth/fetchLogin",
  async userData => {
    try {
      const res = await axios.post(
        "https://jsonplaceholder.typicode.com/posts",
        JSON.stringify(userData)
      );

      localStorage.setItem(
        storageName,
        JSON.stringify({
          userId: 10, // TODO: Here Should Be res.userId
        })
      );

      return 10; // TODO: Here Should Be res.userId
    } catch (e) {
      console.log(e.message);
    }
  }
);

export const fetchSignup = createAsyncThunk(
  "auth/fetchSignup",
  async userData => {
    try {
      const res = await axios.post(
        "https://jsonplaceholder.typicode.com/posts",
        JSON.stringify(userData)
      );

      localStorage.setItem(
        storageName,
        JSON.stringify({
          userId: 10, // TODO: Here Should Be res.userId
        })
      );

      return 10; // TODO: Here Should Be res.userId
    } catch (e) {
      console.log(e.message);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    userId: null,
    isAuthenticated: false,
    loading: false,
  },

  reducers: {
    logout(state) {
      state.userId = null;
      state.isAuthenticated = false;
      state.loading = false;
    },

    login(state, { payload: userId }) {
      state.userId = userId;
      state.isAuthenticated = true;
      state.loading = false;
    },
  },

  extraReducers: {
    [fetchLogin.pending]: state => {
      state.loading = true;
    },

    [fetchLogin.fulfilled]: (state, { payload: userId }) => {
      state.userId = userId;
      state.isAuthenticated = true;
      state.loading = false;
    },

    [fetchSignup.pending]: state => {
      state.loading = true;
    },

    [fetchSignup.fulfilled]: (state, { payload: userId }) => {
      state.userId = userId;
      state.isAuthenticated = true;
      state.loading = false;
    },
  },
});

export const { logout, login } = authSlice.actions;

export const selectUserId = state => state.auth.userId;

export const selectAuthenticateStatus = state => state.auth.isAuthenticated;

export const selectAuthLoading = state => state.auth.loading;

export const userLogout = () => dispatch => {
  localStorage.removeItem(storageName);
  dispatch(logout());
};

export const userLogin = () => dispatch => {
  const userData = JSON.parse(localStorage.getItem(storageName));

  if (userData && userData.userId) {
    dispatch(login(userData.userId));
  }
};

export default authSlice.reducer;
