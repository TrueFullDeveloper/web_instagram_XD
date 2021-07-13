import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const addEvent = createAsyncThunk("createEvent/addEvent", async eventAnnotation => {
  try {
    await axios.post("https://jsonplaceholder.typicode.com/posts", JSON.stringify(eventAnnotation));
  } catch (err) {
    console.log(err.message);
  }
});

const createEventSlice = createSlice({
  name: "createEvent",
  initialState: {
    loading: false,
  },

  extraReducers: {
    [addEvent.pending]: state => {
      state.loading = true;
    },

    [addEvent.fulfilled]: state => {
      state.loading = false;
    },
  },
});

export const selectCreateEventLoading = state => state.createEvent.loading;

export default createEventSlice.reducer;
