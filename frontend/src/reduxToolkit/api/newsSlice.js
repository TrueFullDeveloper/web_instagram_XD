import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

/// FAKE DATA BEGIN
import fakePhotoTitle_1 from "../../static/images/fakeImages/fakePhotoTitle_1.jpg";
import fakePhotoTitle_2 from "../../static/images/fakeImages/fakePhotoTitle_2.jpg";
import fakePhotoTitle_3 from "../../static/images/fakeImages/fakePhotoTitle_3.jpg";
import fakePhotoTitle_4 from "../../static/images/fakeImages/fakePhotoTitle_4.jpg";
import fakePhotoTitle_5 from "../../static/images/fakeImages/fakePhotoTitle_5.jpg";

const payload = [
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
  {
    eventId: 2,
    eventPhotoTitle: fakePhotoTitle_3,
    eventTitle: "Аниме фест",
    eventDesciption:
      "Общее название для события, заключающегося в сборе людей, объединённых любовью к японской культуре с упором на увлечение мангой и аниме.",
    eventDate: "22.08.2021",
    eventTime: "с 13:00 по 18:00",
    eventLocation: "г. Томск, Площадь Святого Петра",
    eventGenre: "Разлечения",
  },
  {
    eventId: 3,
    eventPhotoTitle: fakePhotoTitle_4,
    eventTitle: "Кинологисий фестиваль",
    eventDesciption:
      '13 сентября  на стадионе ЧРООЛС  "Лайка" прошел Кинологический фестиваль.  Студенты отделения "Кинология" участвовали со своими питомцами  в таких соревнованиях как полоса препятствия, эстафета, оценка экстерьера.  Лучшие выступления собак были показаны в конкурсе «Минута славы». Выпускники колледжа «Комитент»,  ныне действующие сотрудники силовых структур, также приняли участие в фестивале.',
    eventDate: "13.09.2021",
    eventTime: "с 12:00 по 15:00",
    eventLocation: 'г. Томск, Стадион ЧРООЛС  "Лайка"',
    eventGenre: "Спорт",
  },
  {
    eventId: 4,
    eventPhotoTitle: fakePhotoTitle_5,
    eventTitle: "Деревья умирают стоя",
    eventDesciption:
      "Сильные люди даже в горе своем предпочитают оставаться сильными, не сгибаться под тяжестью навалившихся несчастий, а главное – не перекладывать страдания на плечи своих близких. Двадцать лет Бабушка жила ожиданием чуда, ожиданием единственного внука, которому она посвятила всю свою жизнь. Но когда он, наконец, приходит, она выгоняет его.",
    eventDate: "12.10.2021",
    eventTime: "с 14:00 по 20:00",
    eventLocation: "г. Томск, Томский Большой Театр",
    eventGenre: "Театр",
  },
];
/// FAKE DATA END

export const fetchNews = createAsyncThunk("news/fetchNews", async () => {
  try {
    const res = await axios.get("https://jsonplaceholder.typicode.com/todos/?_start=0&_limit=5");

    return payload;
  } catch (err) {
    console.log(err.message);
  }
});

const newsSlice = createSlice({
  name: "news",
  initialState: {
    newsList: [],
    loading: false,
  },

  extraReducers: {
    [fetchNews.pending]: state => {
      state.loading = true;
    },

    [fetchNews.fulfilled]: (state, { payload }) => {
      state.newsList = payload;
      state.loading = false;
    },
  },
});

export const selectNewsLoading = state => state.news.loading;

export const selectNewsList = state => state.news.newsList;

export default newsSlice.reducer;
