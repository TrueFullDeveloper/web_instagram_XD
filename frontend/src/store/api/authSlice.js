import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const doLogin = createAsyncThunk("auth/fetchLogin", async ({ email, password }) => {
  try {
    const res = await axios.post(
      "https://jsonplaceholder.typicode.com/posts",
      JSON.stringify(userData)
    );

    localStorage.setItem("userToken", "S9Zs/8/uEGGTVVtLggFTizCsMtwOJnRhjaQ2BMUQhcY");

    return {
      userId: 10,
      userConcierge: { сonciergeName: "Sam", conciergeId: 15 },
    };
  } catch (e) {
    console.log(e.message);
  }
});

export const doSignup = createAsyncThunk("auth/fetchSignup", async userData => {
  try {
    const res = await axios.post(
      "https://jsonplaceholder.typicode.com/posts",
      JSON.stringify(userData)
    );

    localStorage.setItem("userToken", "S9Zs/8/uEGGTVVtLggFTizCsMtwOJnRhjaQ2BMUQhcY");

    return {
      userId: 10,
      userConcierge: { сonciergeName: "Sam", conciergeId: 15 },
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
    tokenUpdate(state) {
      state.userId = null;
      state.userConcierge = null;
      state.isAuthenticated = false;
      state.loading = false;
    },
    logout(state) {
      state.userId = null;
      state.userConcierge = null;
      state.isAuthenticated = false;
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

export const { logout } = authSlice.actions;
export const selectUserId = state => state.auth.userId;
export const selectUserConcierge = state => state.auth.userConcierge;
export const selectAuthenticateStatus = state => state.auth.isAuthenticated;
export const selectAuthLoading = state => state.auth.loading;

export const userLogout = () => dispatch => {
  localStorage.removeItem("userToken");
  dispatch(logout());
};

export const userLogin = () => dispatch => {
  const userToken = localStorage.getItem("userToken");

  if (userToken) {
    dispatch(fetchLogin(userToken));
  }
};

export default authSlice.reducer;
