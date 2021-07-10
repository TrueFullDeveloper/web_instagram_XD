import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useFormik } from "formik";
import * as yup from "yup";
import Select from "react-select";
import Calendar from "react-calendar";
import { searchEvent } from "../../store/api/newsSlice";
import "react-calendar/dist/Calendar.css";

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

const configIntervalOptions = [
  { value: "future", label: "Будущие" },
  { value: "past", label: "Прошедшие" },
  { value: "all", label: "Все" },
];

const FilterForm = () => {
  const [calendarIsOpen, setCalendarOpen] = useState(false);
  const dispatch = useDispatch();

  const { handleSubmit, handleChange, setFieldValue, values, errors } = useFormik({
    initialValues: {
      userQuery: "",
      location: "",
      genre: "",
      eventDate: "",
      interval: "",
    },

    validationSchema: yup.object({
      userQuery: yup.string("Should be string"),
    }),

    onSubmit: ({ userQuery, location, genre, eventDate, interval }) => {
      dispatch(searchEvent({ userQuery, location, genre, eventDate, interval }));
    },
  });

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <input
          type="search"
          name="userQuery"
          id="userQuery"
          placeholder="Поиск мероприятия"
          value={values.userQuery}
          onChange={handleChange}
        />
        <button type="submit">Поиск</button>

        {errors.userQuery ? <div>{errors.userQuery}</div> : null}

        <Select
          name="interval"
          id="interval"
          options={configIntervalOptions}
          placeholder="Выберите временной промежуток"
          onChange={event => setFieldValue("interval", event.value)}
        />

        <Select
          name="location"
          id="location"
          options={configLocationOptions}
          placeholder="Выберите город"
          onChange={event => setFieldValue("location", event.value)}
          isSearchable
        />

        <Select
          name="genre"
          id="genre"
          options={configGenreOptions}
          onChange={event =>
            setFieldValue(
              "genre",
              event.map(eventItem => eventItem.value)
            )
          }
          placeholder="Выберите направление мероприятия"
          isSearchable
          isMulti
        />

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
      </div>
    </form>
  );
};

export default FilterForm;
