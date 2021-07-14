import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

/// FAKE DATA BEGIN
import fakePhotoTitle_1 from "../../static/images/fakeImages/fakePhotoTitle_1.jpg";
import fakePhotoTitle_2 from "../../static/images/fakeImages/fakePhotoTitle_2.jpg";
import fakePhotoTitle_3 from "../../static/images/fakeImages/fakePhotoTitle_3.jpg";
import fakePhotoTitle_4 from "../../static/images/fakeImages/fakePhotoTitle_4.jpg";
import fakePhotoTitle_5 from "../../static/images/fakeImages/fakePhotoTitle_5.jpg";

import fakeEventManager_1 from "../../static/images/fakeImages/fakeEventManager_1.jpg";
import fakeEventManager_2 from "../../static/images/fakeImages/fakeEventManager_2.jpg";

import fakeAuthor_1 from "../../static/images/fakeImages/fakeAuthor_1.jpg";
import fakeAuthor_2 from "../../static/images/fakeImages/fakeAuthor_2.jpg";
import fakeAuthor_3 from "../../static/images/fakeImages/fakeAuthor_3.jpg";

const payload = [
  {
    userFeedbackId: null,
    eventAnnotation: {
      eventId: 0,
      eventPhotoTitle: fakePhotoTitle_1,
      eventTitle: "Томский Марафон",
      eventDesciption:
        "Томский международный марафон был основан в 2018 году. Первый же его старт стал настоящим спортивным праздником с большим количеством участников и гостей. В этот солнечный июньский день на главной площади города собрались 2216 спортсменов, из них 468 марафонцев пробежали 42.2 км, а 1034 атлета попробовали свои силы в полумарафоне.",
      eventDate: "10.06.2021",
      eventTime: "с 15:00 по 19:00",
      eventLocation: 'г. Томск, СК "Буривестник"',
      eventGenre: "Спорт",
      eventRating: 4.5,
      eventManager: {
        eventManagerId: 1,
        eventManagerName: "Егор",
        eventManagerPhoto: fakeEventManager_2,
      },
      parcicipantList: [
        {
          parcicipantId: 0,
          parcicipantName: "Альберт",
          parcicipantPhoto: fakeAuthor_1,
        },
        {
          parcicipantId: 1,
          parcicipantName: "Евгений",
          parcicipantPhoto: fakeAuthor_2,
        },
        {
          parcicipantId: 2,
          parcicipantName: "Ван",
          parcicipantPhoto: fakeAuthor_3,
        },
      ],
    },
    feedbackList: [
      {
        feedbackId: 0,
        authorId: 0,
        authorName: "Альберт",
        authorPhoto: fakeAuthor_1,
        authorRating: 5,
        feedback:
          "Буду краток в форме изложения своего мнения о данном мероприятии: Мероприятие стоищее, не пожалел, что сходил!",
      },
      {
        feedbackId: 1,
        authorId: 1,
        authorName: "Евгений",
        authorPhoto: fakeAuthor_2,
        authorRating: 5,
        feedback: "Евгениальное мероприятие!",
      },
      {
        feedbackId: 2,
        authorId: 2,
        authorName: "Ван",
        authorPhoto: fakeAuthor_3,
        authorRating: 5,
        feedback: "Не будь ♂fucking slave♂ и сходи на это мероприятие!",
      },
    ],
  },
  {
    userFeedbackId: null,
    eventAnnotation: {
      eventId: 1,
      eventPhotoTitle: fakePhotoTitle_2,
      eventTitle: 'Спектакль современного танца "Вертикальное Отражение"',
      eventDesciption:
        "IBdance Company представляет премьерные показы спектакля современного танца “Вертикальное Отражение” «Не человек отражает действительность, а сама действительность отражается в человеке», - Лифшиц М.А.",
      eventDate: "10.07.2021",
      eventTime: "с 14:00 по 18:00",
      eventLocation: "г. Томск, Томский Большой Театр",
      eventGenre: "Театр",
      eventRating: 4.5,
      eventManager: {
        eventManagerId: 0,
        eventManagerName: "Роман",
        eventManagerPhoto: fakeEventManager_1,
      },
      parcicipantList: [
        {
          parcicipantId: 0,
          parcicipantName: "Альберт",
          parcicipantPhoto: fakeAuthor_1,
        },
        {
          parcicipantId: 1,
          parcicipantName: "Евгений",
          parcicipantPhoto: fakeAuthor_2,
        },
        {
          parcicipantId: 2,
          parcicipantName: "Ван",
          parcicipantPhoto: fakeAuthor_3,
        },
      ],
    },
    feedbackList: [
      {
        feedbackId: 3,
        authorId: 0,
        authorName: "Альберт",
        authorPhoto: fakeAuthor_1,
        authorRating: 5,
        feedback:
          "Буду краток в форме изложения своего мнения о данном мероприятии: Мероприятие стоищее, не пожалел, что сходил!",
      },
      {
        feedbackId: 4,
        authorId: 1,
        authorName: "Евгений",
        authorPhoto: fakeAuthor_2,
        authorRating: 5,
        feedback: "Евгениальное мероприятие!",
      },
      {
        feedbackId: 5,
        authorId: 2,
        authorName: "Ван",
        authorPhoto: fakeAuthor_3,
        authorRating: 5,
        feedback: "Не будь ♂fucking slave♂ и сходи на это мероприятие!",
      },
    ],
  },
  {
    userFeedbackId: null,
    eventAnnotation: {
      eventId: 2,
      eventPhotoTitle: fakePhotoTitle_3,
      eventTitle: "Аниме фест",
      eventDesciption:
        "Общее название для события, заключающегося в сборе людей, объединённых любовью к японской культуре с упором на увлечение мангой и аниме.",
      eventDate: "22.08.2021",
      eventTime: "с 13:00 по 18:00",
      eventLocation: "г. Томск, Площадь Святого Петра",
      eventGenre: "Разлечения",
      eventRating: 4.5,
      eventManager: {
        eventManagerId: 0,
        eventManagerName: "Роман",
        eventManagerPhoto: fakeEventManager_1,
      },
      parcicipantList: [
        {
          parcicipantId: 0,
          parcicipantName: "Альберт",
          parcicipantPhoto: fakeAuthor_1,
        },
        {
          parcicipantId: 1,
          parcicipantName: "Евгений",
          parcicipantPhoto: fakeAuthor_2,
        },
        {
          parcicipantId: 2,
          parcicipantName: "Ван",
          parcicipantPhoto: fakeAuthor_3,
        },
      ],
    },
    feedbackList: [
      {
        feedbackId: 6,
        authorId: 0,
        authorName: "Альберт",
        authorPhoto: fakeAuthor_1,
        authorRating: 5,
        feedback:
          "Буду краток в форме изложения своего мнения о данном мероприятии: Мероприятие стоищее, не пожалел, что сходил!",
      },
      {
        feedbackId: 7,
        authorId: 1,
        authorName: "Евгений",
        authorPhoto: fakeAuthor_2,
        authorRating: 5,
        feedback: "Евгениальное мероприятие!",
      },
      {
        feedbackId: 8,
        authorId: 2,
        authorName: "Ван",
        authorPhoto: fakeAuthor_3,
        authorRating: 5,
        feedback: "Не будь ♂fucking slave♂ и сходи на это мероприятие!",
      },
    ],
  },
  {
    userFeedbackId: null,
    eventAnnotation: {
      eventId: 3,
      eventPhotoTitle: fakePhotoTitle_4,
      eventTitle: "Кинологисий фестиваль",
      eventDesciption:
        '13 сентября  на стадионе ЧРООЛС  "Лайка" прошел Кинологический фестиваль.  Студенты отделения "Кинология" участвовали со своими питомцами  в таких соревнованиях как полоса препятствия, эстафета, оценка экстерьера.  Лучшие выступления собак были показаны в конкурсе «Минута славы». Выпускники колледжа «Комитент»,  ныне действующие сотрудники силовых структур, также приняли участие в фестивале.',
      eventDate: "13.09.2021",
      eventTime: "с 12:00 по 15:00",
      eventLocation: 'г. Томск, Стадион ЧРООЛС  "Лайка"',
      eventGenre: "Спорт",
      eventRating: 4.5,
      eventManager: {
        eventManagerId: 1,
        eventManagerName: "Егор",
        eventManagerPhoto: fakeEventManager_2,
      },
      parcicipantList: [
        {
          parcicipantId: 0,
          parcicipantName: "Альберт",
          parcicipantPhoto: fakeAuthor_1,
        },
        {
          parcicipantId: 1,
          parcicipantName: "Евгений",
          parcicipantPhoto: fakeAuthor_2,
        },
        {
          parcicipantId: 2,
          parcicipantName: "Ван",
          parcicipantPhoto: fakeAuthor_3,
        },
      ],
    },
    feedbackList: [
      {
        feedbackId: 9,
        authorId: 0,
        authorName: "Альберт",
        authorPhoto: fakeAuthor_1,
        authorRating: 5,
        feedback:
          "Буду краток в форме изложения своего мнения о данном мероприятии: Мероприятие стоищее, не пожалел, что сходил!",
      },
      {
        feedbackId: 10,
        authorId: 1,
        authorName: "Евгений",
        authorPhoto: fakeAuthor_2,
        authorRating: 5,
        feedback: "Евгениальное мероприятие!",
      },
      {
        feedbackId: 11,
        authorId: 2,
        authorName: "Ван",
        authorPhoto: fakeAuthor_3,
        authorRating: 5,
        feedback: "Не будь ♂fucking slave♂ и сходи на это мероприятие!",
      },
    ],
  },
  {
    userFeedbackId: 13,
    eventAnnotation: {
      eventId: 4,
      eventPhotoTitle: fakePhotoTitle_5,
      eventTitle: "Деревья умирают стоя",
      eventDesciption:
        "Сильные люди даже в горе своем предпочитают оставаться сильными, не сгибаться под тяжестью навалившихся несчастий, а главное – не перекладывать страдания на плечи своих близких. Двадцать лет Бабушка жила ожиданием чуда, ожиданием единственного внука, которому она посвятила всю свою жизнь. Но когда он, наконец, приходит, она выгоняет его.",
      eventDate: "12.10.2021",
      eventTime: "с 14:00 по 20:00",
      eventLocation: "г. Томск, Томский Большой Театр",
      eventGenre: "Театр",
      eventRating: 4.5,
      eventManager: {
        eventManagerId: 0,
        eventManagerName: "Роман",
        eventManagerPhoto: fakeEventManager_1,
      },
      parcicipantList: [
        {
          parcicipantId: 0,
          parcicipantName: "Альберт",
          parcicipantPhoto: fakePhotoTitle_1,
        },
        {
          parcicipantId: 1,
          parcicipantName: "Евгений",
          parcicipantPhoto: fakePhotoTitle_1,
        },
        {
          parcicipantId: 2,
          parcicipantName: "Ван",
          parcicipantPhoto: fakePhotoTitle_1,
        },
      ],
    },
    feedbackList: [
      {
        feedbackId: 12,
        authorId: 0,
        authorName: "Альберт",
        authorPhoto: fakePhotoTitle_1,
        authorRating: 5,
        feedback:
          "Буду краток в форме изложения своего мнения о данном мероприятии: Мероприятие стоищее, не пожалел, что сходил!",
      },
      {
        feedbackId: 13,
        authorId: 1,
        authorName: "Евгений",
        authorPhoto: fakePhotoTitle_1,
        authorRating: 5,
        feedback: "Евгениальное мероприятие!",
      },
      {
        feedbackId: 14,
        authorId: 2,
        authorName: "Ван",
        authorPhoto: fakePhotoTitle_1,
        authorRating: 5,
        feedback: "Не будь ♂fucking slave♂ и сходи на это мероприятие!",
      },
    ],
  },
];
/// FAKE DATA END

export const fetchEvent = createAsyncThunk("event/fetchEvent", async (eventId, userId) => {
  try {
    const res = await axios.get("https://jsonplaceholder.typicode.com/todos/?_start=0&_limit=5");

    return payload[eventId];
  } catch (err) {
    console.log(err.message);
  }
});

export const addFeedback = createAsyncThunk(
  "event/addFeedback",
  async (eventId, userId, feedback) => {
    try {
      const res = await axios.get("https://jsonplaceholder.typicode.com/todos/?_start=0&_limit=5");

      return payload[eventId];
    } catch (err) {
      console.log(err.message);
    }
  }
);

export const removeFeedback = createAsyncThunk(
  "event/removeFeedback",
  async (eventId, feedbackId) => {
    try {
      const res = await axios.get("https://jsonplaceholder.typicode.com/todos/?_start=0&_limit=5");

      return payload[eventId];
    } catch (err) {
      console.log(err.message);
    }
  }
);

const eventSlice = createSlice({
  name: "event",
  initialState: {
    userFeedbackId: null,
    eventAnnotation: null,
    feedbackList: [],
    loading: false,
  },

  extraReducers: {
    [fetchEvent.pending]: state => {
      state.loading = true;
    },

    [fetchEvent.fulfilled]: (
      state,
      { payload: { userFeedbackId, eventAnnotation, feedbackList } }
    ) => {
      state.userFeedbackId = userFeedbackId;
      state.eventAnnotation = eventAnnotation;
      state.feedbackList = feedbackList;
      state.loading = false;
    },

    [addFeedback.pending]: state => {
      state.loading = true;
    },

    [addFeedback.fulfilled]: (state, { payload: { userFeedbackId, feedbackList } }) => {
      state.userFeedbackId = userFeedbackId;
      state.feedbackList = feedbackList;
      state.loading = false;
    },

    [removeFeedback.pending]: state => {
      state.loading = true;
    },

    [removeFeedback.fulfilled]: (state, { payload: { userFeedbackId, feedbackList } }) => {
      state.userFeedbackId = userFeedbackId;
      state.feedbackList = feedbackList;
      state.loading = false;
    },
  },
});

export const selectEventLoading = state => state.event.loading;

export const selectEventAnnotation = state => state.event.eventAnnotation;

export const selectEventId = state => state.event.eventAnnotation.eventId;

export const selectFeedbackList = state => state.event.feedbackList;

export const selectUserFeedbackId = state => state.event.userFeedbackId;

export default eventSlice.reducer;
