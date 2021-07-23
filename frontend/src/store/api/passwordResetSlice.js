import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const sendEmail = createAsyncThunk("passwordReset/sendEmail", async userEmail => {
  try {
    const res = await axios.post(
      "https://jsonplaceholder.typicode.com/posts",
      JSON.stringify(userEmail)
    );

    return "emailSuccess"; // Passwod Reset Status, Should be res.emailStatus
  } catch (err) {
    console.log(err.message);
  }
});

export const changePassword = createAsyncThunk(
  "passwordReset/changePassword",
  async ({ code, newPassword, newPasswodRep }) => {
    try {
      await axios.post(
        "https://jsonplaceholder.typicode.com/posts",
        JSON.stringify(code, newPassword, newPasswodRep)
      );

      return "success"; // Passwod Reset Status, Should be res.emailStatus
    } catch (err) {
      console.log(err.message);
    }
  }
);

const passwordResetSlice = createSlice({
  name: "passwordReset",
  initialState: {
    status: null,
    loading: false,
  },

  extraReducers: {
    [sendEmail.pending]: state => {
      state.loading = true;
    },

    [sendEmail.fulfilled]: (state, { payload: status }) => {
      state.status = status;
      state.loading = false;
    },

    [changePassword.pending]: state => {
      state.loading = true;
    },

    [changePassword.fulfilled]: (state, { payload: status }) => {
      state.status = status;
      state.loading = false;
    },
  },
});

export const selectResetStatus = state => state.passwordReset.status;
export const selectResetLoading = state => state.passwordReset.loading;

export default passwordResetSlice.reducer;
