import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

/// FAKE DATA BEGIN

import fakeAuthor_1 from "../../static/images/fakeImages/fakeAuthor_1.jpg";
import fakeAuthor_2 from "../../static/images/fakeImages/fakeAuthor_2.jpg";

const payload = [
  {
    chatId: 0,
    companion: {
      userId: 0,
      userName: "Альберт",
      userPhoto: fakeAuthor_1,
      onlineStatus: true,
    },
  },
  {
    chatId: 1,
    companion: {
      userId: 1,
      userName: "Евгений",
      userPhoto: fakeAuthor_2,
      onlineStatus: false,
    },
  },
];
/// FAKE DATA END

export const fetchChatList = createAsyncThunk("chatList/fetchChatList", async userId => {
  try {
    const res = await axios.get("https://jsonplaceholder.typicode.com/todos/?_start=0&_limit=5");

    return payload;
  } catch (err) {
    console.log(err.message);
  }
});

export const searchCompanion = createAsyncThunk("chatList/searchCompanion", async userQuery => {
  try {
    const res = await axios.get("https://jsonplaceholder.typicode.com/todos/?_start=0&_limit=5");

    return payload;
  } catch (err) {
    console.log(err.message);
  }
});

const chatListSlice = createSlice({
  name: "chatList",
  initialState: {
    chatList: [],
    loading: false,
  },

  extraReducers: {
    [fetchChatList.pending]: state => {
      state.loading = true;
    },

    [fetchChatList.fulfilled]: (state, { payload }) => {
      state.chatList = payload;
      state.loading = false;
    },

    [searchCompanion.pending]: state => {
      state.loading = true;
    },

    [searchCompanion.fulfilled]: (state, { payload }) => {
      state.chatList = payload;
      state.loading = false;
    },
  },
});

export const selectChatListLoading = state => state.chatList.loading;
export const selectChatList = state => state.chatList.chatList;

export default chatListSlice.reducer;
