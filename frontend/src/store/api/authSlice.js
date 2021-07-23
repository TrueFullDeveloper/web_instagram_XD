import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const login = createAsyncThunk("auth/login", async ({ email, password }) => {
  try {
    const res = await axios.post("https://jsonplaceholder.typicode.com/posts", { email, password });

    localStorage.setItem("userToken", "S9Zs/8/uEGGTVVtLggFTizCsMtwOJnRhjaQ2BMUQhcY");

    return {
      userId: 10,
      userConcierge: { сonciergeName: "Sam", conciergeId: 15 },
    };
  } catch (e) {
    console.log(e.message);
  }
});

export const signup = createAsyncThunk("auth/signup", async ({ email, password, userName }) => {
  try {
    const res = await axios.post("https://jsonplaceholder.typicode.com/posts", {
      email,
      password,
      userName,
    });

    localStorage.setItem("userToken", "S9Zs/8/uEGGTVVtLggFTizCsMtwOJnRhjaQ2BMUQhcY");

    return {
      userId: 10,
      userConcierge: { сonciergeName: "Sam", conciergeId: 15 },
    };
  } catch (e) {
    console.log(e.message);
  }
});

export const tokenUpdate = createAsyncThunk("auth/tokenUpdate", async () => {
  try {
    const userToken = localStorage.getItem("userToken");

    if (userToken) {
      const res = await axios.post("https://jsonplaceholder.typicode.com/posts", userToken);

      localStorage.setItem("userToken", "S9Zs/8/uEGGTVVtLggFTizCsMtwOJnRhjaQ2BMUQhcY");

      return {
        userId: 10,
        userConcierge: { сonciergeName: "Sam", conciergeId: 15 },
        isAuthenticated: true,
      };
    }

    return {
      userId: null,
      userConcierge: null,
      isAuthenticated: false,
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
      localStorage.removeItem("userToken");
      state.userId = null;
      state.userConcierge = null;
      state.isAuthenticated = false;
      state.loading = false;
    },
  },

  extraReducers: {
    [login.pending]: state => {
      state.loading = true;
    },

    [login.fulfilled]: (state, { payload: { userId, userConcierge } }) => {
      state.userId = userId;
      state.userConcierge = userConcierge;
      state.isAuthenticated = true;
      state.loading = false;
    },

    [signup.pending]: state => {
      state.loading = true;
    },

    [signup.fulfilled]: (state, { payload: { userId, userConcierge } }) => {
      state.userId = userId;
      state.userConcierge = userConcierge;
      state.isAuthenticated = true;
      state.loading = false;
    },

    [tokenUpdate.pending]: state => {
      state.loading = true;
    },

    [tokenUpdate.fulfilled]: (state, { payload: { userId, userConcierge, isAuthenticated } }) => {
      state.userId = userId;
      state.userConcierge = userConcierge;
      state.isAuthenticated = isAuthenticated;
      state.loading = false;
    },
  },
});

export const { logout } = authSlice.actions;
export const selectUserId = state => state.auth.userId;
export const selectUserConcierge = state => state.auth.userConcierge;
export const selectAuthenticateStatus = state => state.auth.isAuthenticated;
export const selectAuthLoading = state => state.auth.loading;

export default authSlice.reducer;
