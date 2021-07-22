import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useFormik } from "formik";
import * as yup from "yup";
import Select from "react-select";
import Calendar from "react-calendar";
import { searchEvent } from "../../store/api/newsSlice";
import "react-calendar/dist/Calendar.css";
import styles from "./FilterForm.module.scss";
// Config
import { LOCATIONS, GENRE, INTERVAL } from "../../config/constants";
import { SELECT_STYLES } from "../../config/styles";

const intervalOptions = Object.entries(INTERVAL).map(item => ({
  value: item[0],
  label: item[1],
}));

const locationOptions = Object.entries(LOCATIONS).map(item => ({
  value: item[0],
  label: item[1],
}));

const genreOptions = Object.entries(GENRE).map(item => ({
  value: item[0],
  label: item[1],
}));

const FilterForm = () => {
  const dispatch = useDispatch();
  const [calendarIsOpen, setCalendarOpen] = useState(false);

  const { handleSubmit, handleChange, setFieldValue, values } = useFormik({
    initialValues: {
      userQuery: "",
      location: "",
      genre: "",
      eventDate: "",
      interval: "all",
    },

    validationSchema: yup.object({
      userQuery: yup.string(),
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

          <Select
            name="interval"
            id="interval"
            options={intervalOptions}
            placeholder="Выберите временной промежуток"
            onChange={event => setFieldValue("interval", event.value)}
            styles={SELECT_STYLES}
            defaultValue={intervalOptions[0]}
          />

          <Select
            name="location"
            id="location"
            options={locationOptions}
            placeholder="Выберите город"
            onChange={event => setFieldValue("location", event.value)}
            styles={SELECT_STYLES}
            isSearchable
          />

          <Select
            name="genre"
            id="genre"
            options={genreOptions}
            placeholder="Выберите направление мероприятия"
            onChange={event =>
              setFieldValue(
                "genre",
                event.map(eventItem => eventItem.value)
              )
            }
            styles={SELECT_STYLES}
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
                Выбрать дату
              </button>
            </>
          )}
        </div>
      </form>
    </div>
  );
};

export default FilterForm;
