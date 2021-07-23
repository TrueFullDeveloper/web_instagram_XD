import React, { useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { Picker } from "emoji-mart";
import { useDispatch, useSelector } from "react-redux";
import { selectUserId } from "../../store/api/authSlice";
import { addFeedback, selectEventId } from "../../store/api/eventSlice";
import styles from "./FeedbackForm.module.scss";
import "emoji-mart/css/emoji-mart.css";
//Icon
import smileIcon from "../../static/images/messageIcon/smile.svg";
//i18n
import { useTranslation } from "react-i18next";

const FeedbackForm = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const userId = useSelector(selectUserId);
  const eventId = useSelector(selectEventId);
  const [pickerIsOpen, setPicker] = useState(false);
  const [isRate, setRate] = useState(false);

  const onClick = userRating => {
    setFieldValue("userRating", userRating);
    setRate(true);
  };

  const { handleSubmit, handleChange, setFieldValue, values, errors, touched } = useFormik({
    initialValues: {
      userRating: "",
      feedbackText: "",
    },

    validationSchema: yup.object({
      userRating: yup.number().required(t("pages.eventPage.ratingNotRequiredError")),
      feedbackText: yup
        .string()
        .max(400, t("pages.eventPage.feedbackExceedsLimitError"))
        .required(t("pages.eventPage.feedbackNotRequiredError")),
    }),

    onSubmit: ({ feedbackText, userRating }) => {
      dispatch(addFeedback(eventId, userId, { feedbackText, userRating }));
    },
  });

  return (
    <div className={styles.feedback_section}>
      <div className={styles.border}></div>
      <h1>{t("pages.eventPage.feedbackFormTitle")}</h1>
      <form className={styles.feedback_form} onSubmit={handleSubmit}>
        <div className={styles.reviews}>
          {isRate ? (
            <span>
              {t("pages.eventPage.ratingMessage")} {values.userRating}
            </span>
          ) : (
            <>
              <i className={`ion-star ${styles.s1}`} onClick={() => onClick(5)}></i>
              <i className={`ion-star ${styles.s2}`} onClick={() => onClick(4)}></i>
              <i className={`ion-star ${styles.s3}`} onClick={() => onClick(3)}></i>
              <i className={`ion-star ${styles.s4}`} onClick={() => onClick(2)}></i>
              <i className={`ion-star ${styles.s5}`} onClick={() => onClick(1)}></i>
            </>
          )}
        </div>

        <textarea
          className={styles.feedback_form_text}
          type="text"
          id="feedbackText"
          name="feedbackText"
          placeholder={t("pages.eventPage.feedbackFormPlaceholder")}
          value={values.feedbackText}
          onChange={handleChange}
        />

        {touched.feedbackText && errors.feedbackText ? (
          <span className={styles.error_message}>{errors.feedbackText}</span>
        ) : null}

        {touched.userRating && errors.userRating ? (
          <span className={styles.error_message}>{errors.userRating}</span>
        ) : null}

        {pickerIsOpen && (
          <div className={styles.picker}>
            <Picker
              set="apple"
              onSelect={emoji => {
                setFieldValue("feedbackText", `${values.feedbackText}${emoji.native}`);
                setPicker(false);
              }}
              emojiSize={20}
            />
          </div>
        )}

        <button
          className={styles.picker_button}
          type="button"
          onClick={() => setPicker(!pickerIsOpen)}
        >
          <img src={smileIcon} alt={t("pages.eventPage.smileButtonAlt")} />
        </button>

        <button className={styles.feedback_form_button} type="submit">
          {t("pages.eventPage.feedbackFormButton")}
        </button>
      </form>
    </div>
  );
};

export default FeedbackForm;
