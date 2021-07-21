import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useFormik } from "formik";
import * as yup from "yup";
import Select from "react-select";
import Calendar from "react-calendar";
import TimeField from "react-simple-timefield";
import "react-calendar/dist/Calendar.css";
import { addEvent } from "../../store/api/createEventSlice";
import styles from "./CreateEventForm.module.scss";
import { LOCATIONS } from "../../config/constants";
//i18n
import { useTranslation } from 'react-i18next';

// TODO: Transfer it to Config
// TODO: Stylize Input Type File!!!

const configGenreOptions = [
  { value: "sport", label: "Спорт" },
  { value: "theatre", label: "Театр" },
  { value: "entertainment", label: "Развлечения" },
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

const CreateEventForm = () => {
  const { t } = useTranslation("description");

  const [calendarIsOpen, setCalendarOpen] = useState(false);
  const dispatch = useDispatch();

  const locationOptions = Object.entries(LOCATIONS).map(item => ({
    value: item[0],
    label: item[1],
  }));

  const { handleSubmit, handleChange, setFieldValue, values, errors, touched } = useFormik({
    initialValues: {
      title: "",
      photo: "",
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
    <div className={styles.create_event_form}>
      <form onSubmit={handleSubmit}>
        <div>
          <div>
            <span>{t('part2')}</span>
            <input
              className={styles.title_field}
              type="text"
              name="title"
              id="title"
              placeholder="Название мероприятия"
              value={values.title}
              onChange={handleChange}
            />

            {touched.title && errors.title ? (
              <span className={styles.error_message}>{errors.title}</span>
            ) : null}
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

            {touched.photo && errors.photo ? (
              <span className={styles.error_message}>{errors.photo}</span>
            ) : null}
          </div>
          <div>
            <span>Напишите описание мероприятия</span>
            <textarea
              className={styles.description_form_text}
              type="text"
              name="description"
              id="description"
              placeholder="Описание мероприятия"
              value={values.description}
              onChange={handleChange}
            />

            {touched.description && errors.description ? (
              <span className={styles.error_message}>{errors.description}</span>
            ) : null}
          </div>
          <Select
            name="location"
            id="location"
            options={locationOptions}
            width="200px"
            menuColor="red"
            placeholder="Выберите город"
            onChange={event => setFieldValue("location", event.value)}
            styles={selectStyles}
            isSearchable
          />

          {touched.location && errors.location ? (
            <span className={styles.error_message}>{errors.location}</span>
          ) : null}

          <Select
            name="genre"
            id="genre"
            options={configGenreOptions}
            onChange={event => setFieldValue("genre", event.value)}
            styles={selectStyles}
            placeholder="Выберите направление мероприятия"
            isSearchable
          />

          {touched.genre && errors.genre ? (
            <span className={styles.error_message}>{errors.genre}</span>
          ) : null}

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

          {touched.eventDate && errors.eventDate ? (
            <span className={styles.error_message}>{errors.eventDate}</span>
          ) : null}

          <div>
            <span>Укажите время начала мероприятия</span>
            <TimeField
              style={{
                border: "2px solid #666",
                fontSize: 42,
                width: 110,
                padding: "5px 8px",
                color: "#333",
                borderRadius: 3,
              }}
              value={values.beginTime}
              onChange={(_, value) => setFieldValue("beginTime", value)}
              colon=":"
            />
          </div>

          {touched.beginTime && errors.beginTime ? (
            <span className={styles.error_message}>{errors.beginTime}</span>
          ) : null}

          <div>
            <span>Укажите время окончание мероприятия</span>
            <TimeField
              style={{
                border: "2px solid #666",
                fontSize: 42,
                width: 110,
                padding: "5px 8px",
                color: "#333",
                borderRadius: 3,
              }}
              value={values.finishTime}
              onChange={(_, value) => setFieldValue("finishTime", value)}
              colon=":"
            />
          </div>

          {touched.finishTime && errors.finishTime ? (
            <span className={styles.error_message}>{errors.finishTime}</span>
          ) : null}

          <button className={styles.submit_button} type="submit">
            Зарегистрировать мероприятие
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateEventForm;
