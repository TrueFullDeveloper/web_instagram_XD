import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const storageName = "UserData"; // TODO: Transfer it to Constants.js

export const fetchLogin = createAsyncThunk("auth/fetchLogin", async userData => {
  try {
    const res = await axios.post(
      "https://jsonplaceholder.typicode.com/posts",
      JSON.stringify(userData)
    );

    localStorage.setItem(
      storageName,
      JSON.stringify({
        userId: 10, // Here Should Be res.userId
        userConcierge: { сonciergeName: "Sam", conciergeId: 15 }, // Here Should Be res.userConcierge
      })
    );

    return {
      userId: 10, // Here Should Be res.userId
      userConcierge: { сonciergeName: "Sam", conciergeId: 15 }, // Here Should Be res.userConcierge
    };
  } catch (e) {
    console.log(e.message);
  }
});

export const fetchSignup = createAsyncThunk("auth/fetchSignup", async userData => {
  try {
    const res = await axios.post(
      "https://jsonplaceholder.typicode.com/posts",
      JSON.stringify(userData)
    );

    localStorage.setItem(
      storageName,
      JSON.stringify({
        userId: 10, // Here Should Be res.userId
        userConcierge: { сonciergeName: "Sam", conciergeId: 15 }, // Here Should Be res.userConcierge
      })
    );

    return {
      userId: 10, // Here Should Be res.userId
      userConcierge: { сonciergeName: "Sam", conciergeId: 15 }, // Here Should Be res.userConcierge
    };
  } catch (e) {
    console.log(e.message);
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState: {
    userId: null,
    userConcierge: null,
    isAuthenticated: false,
    loading: false,
  },

  reducers: {
    logout(state) {
      console.log(state);
      state.userId = null;
      state.userConcierge = null;
      state.isAuthenticated = false;
      state.loading = false;
    },

    login(state, { payload: { userId, userConcierge } }) {
      state.userId = userId;
      state.userConcierge = userConcierge;
      state.isAuthenticated = true;
      state.loading = false;
    },
  },

  extraReducers: {
    [fetchLogin.pending]: state => {
      state.loading = true;
    },

    [fetchLogin.fulfilled]: (state, { payload: { userId, userConcierge } }) => {
      state.userId = userId;
      state.userConcierge = userConcierge;
      state.isAuthenticated = true;
      state.loading = false;
    },

    [fetchSignup.pending]: state => {
      state.loading = true;
    },

    [fetchSignup.fulfilled]: (state, { payload: { userId, userConcierge } }) => {
      state.userId = userId;
      state.userConcierge = userConcierge;
      state.isAuthenticated = true;
      state.loading = false;
    },
  },
});

export const { logout, login } = authSlice.actions;

export const selectUserId = state => state.auth.userId;

export const selectUserConcierge = state => state.auth.userConcierge;

export const selectAuthenticateStatus = state => state.auth.isAuthenticated;

export const selectAuthLoading = state => state.auth.loading;

export const userLogout = () => dispatch => {
  localStorage.removeItem(storageName);
  dispatch(logout());
};

export const userLogin = () => dispatch => {
  const userData = JSON.parse(localStorage.getItem(storageName));

  if (userData && userData.userId) {
    dispatch(login({ userId: userData.userId, userConcierge: userData.userConcierge }));
  }
};

export default authSlice.reducer;
