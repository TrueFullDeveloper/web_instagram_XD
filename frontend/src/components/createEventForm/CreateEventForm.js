import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useFormik } from "formik";
import * as yup from "yup";
import Select from "react-select";
import Calendar from "react-calendar";
import TimeField from "react-simple-timefield";
import "react-calendar/dist/Calendar.css";
import { addEvent } from "../../store/api/createEventSlice";

// TODO: Transfer it to Config
const configLocationOptions = [
  { value: "tomsk", label: "Томск" },
  { value: "moscow", label: "Москва" },
  { value: "novokuznetsk", label: "Новокузнецк" },
];

const configGenreOptions = [
  { value: "sport", label: "Спорт" },
  { value: "theatre", label: "Театр" },
  { value: "entertainment", label: "Развлечения" },
];

const CreateEventForm = () => {
  const [calendarIsOpen, setCalendarOpen] = useState(false);
  const dispatch = useDispatch();

  const { handleSubmit, handleChange, setFieldValue, values, errors } = useFormik({
    initialValues: {
      title: "",
      photo: null,
      description: "",
      location: "",
      genre: "",
      eventDate: "",
      beginTime: "00:00",
      finishTime: "00:00",
    },

    validationSchema: yup.object({
      title: yup.string("Should be string").required("Title is not Required"),
      photo: yup.string().required("Photo is not Required"),
      description: yup
        .string("Should be string")
        .min(40, "Description should be longer then 40 characters")
        .max(400, "Description must be shorter than 400 characters")
        .required("Description is not Required"),
      location: yup.string("Should be string").required("Location is not Required"),
      genre: yup.string("Should be string").required("Genre is not Required"),
      eventDate: yup.string("Should be string").required("Event date is not Required"),
      beginTime: yup.string("Should be string").required("Begin Time date is not Required"),
      finishTime: yup.string("Should be string").required("Finish Time date is not Required"),
    }),

    onSubmit: ({
      title,
      photo,
      description,
      location,
      genre,
      eventDate,
      beginTime,
      finishTime,
    }) => {
      dispatch(
        addEvent({ title, photo, description, location, genre, eventDate, beginTime, finishTime })
      );
    },
  });

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <div>
          <span>Укажите название мероприятия</span>
          <input
            type="text"
            name="title"
            id="title"
            placeholder="Название мероприятия"
            value={values.title}
            onChange={handleChange}
          />
          {errors.title ? <div>{errors.title}</div> : null}
        </div>
        <div>
          <span>Фото для заголовка мероприятия</span>
          <input
            type="file"
            id="photo"
            name="photo"
            accept=".jpg, .jpeg, .png"
            onChange={handleChange}
          />
          {errors.photo ? <div>{errors.photo}</div> : null}
        </div>
        <div>
          <span>Напишите описание мероприятия</span>
          <textarea
            type="text"
            name="description"
            id="description"
            placeholder="Описание мероприятия"
            value={values.description}
            onChange={handleChange}
          />
          {errors.description ? <div>{errors.description}</div> : null}
        </div>
        <Select
          name="location"
          id="location"
          options={configLocationOptions}
          placeholder="Выберите город"
          onChange={event => setFieldValue("location", event.value)}
          isSearchable
        />
        {errors.location ? <div>{errors.location}</div> : null}

        <Select
          name="genre"
          id="genre"
          options={configGenreOptions}
          onChange={event => setFieldValue("genre", event.value)}
          placeholder="Выберите направление мероприятия"
          isSearchable
        />
        {errors.genre ? <div>{errors.genre}</div> : null}

        {calendarIsOpen ? (
          <>
            <span>Дата: {values.eventDate}</span>
            <Calendar
              name="eventDate"
              id="eventDate"
              onChange={event =>
                setFieldValue(
                  "eventDate",
                  `${event.getDate()}.${event.getMonth()}.${event.getFullYear()}`
                )
              }
            />
            <button onClick={() => setCalendarOpen(false)}>Закрыть</button>
          </>
        ) : (
          <button onClick={() => setCalendarOpen(true)}>Выбать дату</button>
        )}
        {errors.eventDate ? <div>{errors.eventDate}</div> : null}

        <div>
          <span>Укажите время начала мероприятия</span>
          <TimeField
            value={values.beginTime}
            onChange={(_, value) => setFieldValue("beginTime", value)}
            colon=":"
          />
        </div>
        {errors.beginTime ? <div>{errors.beginTime}</div> : null}

        <div>
          <span>Укажите время окончание мероприятия</span>
          <TimeField
            value={values.finishTime}
            onChange={(_, value) => setFieldValue("finishTime", value)}
            colon=":"
          />
        </div>
        {errors.finishTime ? <div>{errors.finishTime}</div> : null}

        <button type="submit">Зарегистрировать мероприятие</button>
      </div>
    </form>
  );
};

export default CreateEventForm;
