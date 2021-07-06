import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

/// FAKE DATA BEGIN

import fakeUserListManager_1 from "../../static/images/fakeImages/fakeEventManager_1.jpg";
import fakeUserListManager_2 from "../../static/images/fakeImages/fakeEventManager_2.jpg";

import fakeAuthor_1 from "../../static/images/fakeImages/fakeAuthor_1.jpg";
import fakeAuthor_2 from "../../static/images/fakeImages/fakeAuthor_2.jpg";
import fakeAuthor_3 from "../../static/images/fakeImages/fakeAuthor_3.jpg";

const payload = [
  {
    userId: 0,
    userName: "Альберт",
    userPhoto: fakeAuthor_1,
  },
  {
    userId: 1,
    userName: "Евгений",
    userPhoto: fakeAuthor_2,
  },
  {
    userId: 2,
    userName: "Ван",
    userPhoto: fakeAuthor_3,
  },
  {
    userId: 0,
    userName: "Роман",
    userPhoto: fakeUserListManager_1,
  },
  {
    userId: 1,
    userName: "Егор",
    userPhoto: fakeUserListManager_2,
  },
];
/// FAKE DATA END

export const fetchUserList = createAsyncThunk("userList/fetchUserList", async userId => {
  try {
    const res = await axios.get("https://jsonplaceholder.typicode.com/todos/?_start=0&_limit=5");

    return payload;
  } catch (err) {
    console.log(err.message);
  }
});

const userListSlice = createSlice({
  name: "userList",
  initialState: {
    userList: [],
    loading: false,
  },

  extraReducers: {
    [fetchUserList.pending]: state => {
      state.loading = true;
    },

    [fetchUserList.fulfilled]: (state, { payload }) => {
      state.userList = payload;
      state.loading = false;
    },
  },
});

export const selectUserListLoading = state => state.userList.loading;

export const selectUserList = state => state.userList.userListAnnotation;

export default userListSlice.reducer;
