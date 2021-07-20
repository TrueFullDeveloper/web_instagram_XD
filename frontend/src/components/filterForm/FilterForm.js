import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useFormik } from "formik";
import * as yup from "yup";
import Select from "react-select";
import Calendar from "react-calendar";
import { searchEvent } from "../../store/api/newsSlice";
import "react-calendar/dist/Calendar.css";
import styles from "./FilterForm.module.scss";

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

const selectStyles = {
  control: css => ({
    ...css,
    marginTop: "20px",
    height: "60px",
    background: "#282828",
    border: "0",
  }),
  singleValue: css => ({
    ...css,
    color: "#ffffff",
  }),
};

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
    <div className={styles.filter_form}>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            className={styles.search_field}
            type="search"
            name="userQuery"
            id="userQuery"
            placeholder="Поиск мероприятия"
            value={values.userQuery}
            onChange={handleChange}
          />
          <button type="submit" className={styles.search_button}>
            Поиск
          </button>

          {errors.userQuery ? <div>{errors.userQuery}</div> : null}

          <Select
            name="interval"
            id="interval"
            options={configIntervalOptions}
            placeholder="Выберите временной промежуток"
            onChange={event => setFieldValue("interval", event.value)}
            styles={selectStyles}
          />

          <Select
            name="location"
            id="location"
            options={configLocationOptions}
            placeholder="Выберите город"
            onChange={event => setFieldValue("location", event.value)}
            styles={selectStyles}
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
            styles={selectStyles}
            placeholder="Выберите направление мероприятия"
            isSearchable
            isMulti
          />

          {calendarIsOpen ? (
            <>
              <Calendar
                name="eventDate"
                id="eventDate"
                onChange={event => {
                  setFieldValue(
                    "eventDate",
                    `${event.getDate()}.${event.getMonth()}.${event.getFullYear()}`
                  );
                  setCalendarOpen(false);
                }}
                styles={selectStyles}
              />
              <button
                className={`${styles.calendar_button} ${styles.close_button}`}
                type="button"
                onClick={() => setCalendarOpen(false)}
              >
                Закрыть
              </button>
            </>
          ) : (
            <>
              {values.eventDate ? (
                <span>Дата: {values.eventDate}</span>
              ) : (
                <span>Дата не выбрана</span>
              )}

              <button
                className={styles.calendar_button}
                type="button"
                onClick={() => setCalendarOpen(true)}
              >
                Выбать дату
              </button>
            </>
          )}
        </div>
      </form>
    </div>
  );
};

export default FilterForm;
