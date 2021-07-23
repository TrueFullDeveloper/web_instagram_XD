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
//Config
import { LOCATIONS, GENRE } from "../../config/constants";
import { SELECT_STYLES } from "../../config/styles";
//i18n
import { useTranslation } from "react-i18next";

const locationOptions = Object.entries(LOCATIONS).map(item => ({
  value: item[0],
  label: item[1],
}));

const genreOptions = Object.entries(GENRE).map(item => ({
  value: item[0],
  label: item[1],
}));

// TODO: Stylize Input Type File!!!

const CreateEventForm = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [calendarIsOpen, setCalendarOpen] = useState(false);

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
      title: yup.string().required(t("pages.createEventPage.titleNotRequiredError")),
      photo: yup.string().required(t("pages.createEventPage.photoNotRequiredError")),
      description: yup
        .string()
        .min(40, t("pages.createEventPage.descriptionShortError"))
        .max(400, t("pages.createEventPage.descriptionExceedsLimitError"))
        .required(t("pages.createEventPage.descriptionNotRequiredError")),
      location: yup.string().required(t("pages.createEventPage.locationNotRequiredError")),
      genre: yup.string().required(t("pages.createEventPage.genreNotRequiredError")),
      eventDate: yup.string().required(t("pages.createEventPage.eventDateNotRequiredError")),
      beginTime: yup.string().required(t("pages.createEventPage.beginTimeNotRequiredError")),
      finishTime: yup.string().required(t("pages.createEventPage.finishTimeNotRequiredError")),
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
            <span>{t("pages.createEventPage.enterTitleMessage")}</span>
            <input
              className={styles.title_field}
              type="text"
              name="title"
              id="title"
              placeholder={t("pages.createEventPage.eventTitlePlaceholder")}
              value={values.title}
              onChange={handleChange}
            />

            {touched.title && errors.title ? (
              <span className={styles.error_message}>{errors.title}</span>
            ) : null}
          </div>
          <div>
            <span>{t("pages.createEventPage.enterTitlePhotoMessage")}</span>
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
            <span>{t("pages.createEventPage.enterEventDescriptionMessage")}</span>
            <textarea
              className={styles.description_form_text}
              type="text"
              name="description"
              id="description"
              placeholder={t("pages.createEventPage.eventDescriptionPlaceholder")}
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
            placeholder={t("pages.createEventPage.selectLocationPlaceholder")}
            onChange={event => setFieldValue("location", event.value)}
            styles={SELECT_STYLES}
            isSearchable
          />

          {touched.location && errors.location ? (
            <span className={styles.error_message}>{errors.location}</span>
          ) : null}

          <Select
            name="genre"
            id="genre"
            options={genreOptions}
            onChange={event => setFieldValue("genre", event.value)}
            styles={SELECT_STYLES}
            placeholder={t("pages.createEventPage.selectGenrePlaceholder")}
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
              />
              <button
                className={`${styles.calendar_button} ${styles.close_button}`}
                type="button"
                onClick={() => setCalendarOpen(false)}
              >
                {t("common.calendar.closeButton")}
              </button>
            </>
          ) : (
            <>
              {values.eventDate ? (
                <span>
                  {t("common.calendar.eventDate")} {values.eventDate}
                </span>
              ) : (
                <span>{t("common.calendar.eventDateNotSelected")}</span>
              )}

              <button
                className={styles.calendar_button}
                type="button"
                onClick={() => setCalendarOpen(true)}
              >
                {t("common.calendar.selectDateButton")}
              </button>
            </>
          )}

          {touched.eventDate && errors.eventDate ? (
            <span className={styles.error_message}>{errors.eventDate}</span>
          ) : null}

          <div>
            <span>{t("pages.createEventPage.enterEventBeginTimeTitle")}</span>
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
            <span>{t("pages.createEventPage.enterEventFinishTimeTitle")}</span>
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
            {t("pages.createEventPage.signupEventButton")}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateEventForm;
