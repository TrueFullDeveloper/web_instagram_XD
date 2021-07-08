import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// FAKE DATA BEGIN
import fakePhotoTitle_1 from "../../static/images/fakeImages/fakePhotoTitle_1.jpg";
import fakePhotoTitle_2 from "../../static/images/fakeImages/fakePhotoTitle_2.jpg";

const userRepostList = [
  {
    reportId: 0,
    eventId: 0,
    eventPhotoTitle: fakePhotoTitle_1,
    eventTitle: "Томский Марафон",
    eventDesciption:
      "Томский международный марафон был основан в 2018 году. Первый же его старт стал настоящим спортивным праздником с большим количеством участников и гостей. В этот солнечный июньский день на главной площади города собрались 2216 спортсменов, из них 468 марафонцев пробежали 42.2 км, а 1034 атлета попробовали свои силы в полумарафоне.",
    eventDate: "10.06.2021",
    eventTime: "с 15:00 по 19:00",
    eventLocation: 'г. Томск, СК "Буривестник"',
    eventGenre: "Спорт",
  },
  {
    reportId: 1,
    eventId: 1,
    eventPhotoTitle: fakePhotoTitle_2,
    eventTitle: 'Спектакль современного танца "Вертикальное Отражение"',
    eventDesciption:
      "IBdance Company представляет премьерные показы спектакля современного танца “Вертикальное Отражение” «Не человек отражает действительность, а сама действительность отражается в человеке», - Лифшиц М.А.",
    eventDate: "10.07.2021",
    eventTime: "с 14:00 по 18:00",
    eventLocation: "г. Томск, Томский Большой Театр",
    eventGenre: "Театр",
  },
];
// FAKE DATA BEGIN

export const fetchRepost = createAsyncThunk("repost/fetchRepost", async userId => {
  try {
    const res = await axios.get("https://jsonplaceholder.typicode.com/todos/?_start=0&_limit=5");

    const payload = userRepostList; // Here Should be res from Server

    return payload;
  } catch (err) {
    console.log(err.message);
  }
});

export const addRepost = createAsyncThunk("repost/fetchRepost", async eventId => {
  try {
    const res = await axios.get("https://jsonplaceholder.typicode.com/todos/?_start=0&_limit=5");

    const payload = userRepostList; // Here Should be res from Server

    return payload;
  } catch (err) {
    console.log(err.message);
  }
});

export const deleteRepost = createAsyncThunk("repost/deleteRepost", async repostId => {
  try {
    const res = await axios.get("https://jsonplaceholder.typicode.com/todos/?_start=0&_limit=5");

    const payload = userRepostList; // Here Should be Photo url from Server

    return payload;
  } catch (err) {
    console.log(err.message);
  }
});

const repostSlice = createSlice({
  name: "repost",
  initialState: {
    userRepostList: [],
    loading: false,
  },

  extraReducers: {
    [fetchRepost.pending]: state => {
      state.loading = true;
    },

    [fetchRepost.fulfilled]: (state, { payload }) => {
      state.userRepostList = payload;
      state.loading = false;
    },

    [addRepost.pending]: state => {
      state.loading = true;
    },

    [addRepost.fulfilled]: (state, { payload }) => {
      state.userRepostList = payload;
      state.loading = false;
    },

    [deleteRepost.pending]: state => {
      state.loading = true;
    },

    [deleteRepost.fulfilled]: (state, { payload }) => {
      state.userRepostList = payload;
      state.loading = false;
    },
  },
});

export const selectRepostLoading = state => state.repost.loading;

export const selectRepostList = state => state.repost.userRepostList;

export default repostSlice.reducer;
