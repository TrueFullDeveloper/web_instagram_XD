import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// FAKE DATA BEGIN
import fakeUserPhoto from "../../static/images/fakeImages/fakeUserPhoto.jpg";
import fakePhotoTitle_1 from "../../static/images/fakeImages/fakePhotoTitle_1.jpg";
import fakePhotoTitle_2 from "../../static/images/fakeImages/fakePhotoTitle_2.jpg";

const userData = {
  userPhoto: fakeUserPhoto,
  userName: "Sergio",
  email: "wannakillms@gmail.com",
  userInformation: "Hi, I am from Russia, I am professional event manager! :D",
  phoneNumber: "8-(960)-906-10-87",
  userRepostList: [
    {
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
  ],
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
      userRepostList: [],
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
