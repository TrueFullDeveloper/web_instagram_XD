import React, { useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { Picker } from "emoji-mart";
import { useDispatch, useSelector } from "react-redux";
import { selectUserId } from "../../store/api/authSlice";
import { addFeedback, selectEventId } from "../../store/api/eventSlice";
import "emoji-mart/css/emoji-mart.css";

const FeedbackForm = () => {
  const dispatch = useDispatch();
  const userId = useSelector(selectUserId);
  const eventId = useSelector(selectEventId);
  const [pickerIsOpen, setPicker] = useState(false);

  const { handleSubmit, handleChange, setFieldValue, values, errors } = useFormik({
    initialValues: {
      userRating: "",
      feedbackText: "",
    },

    validationSchema: yup.object({
      userRating: yup.number().required("Поставьте оценку!!!"),
      feedbackText: yup
        .string()
        .max(400, "Feedback must be shorter than 400 characters")
        .required("Feedback is not Required"),
    }),

    onSubmit: ({ feedbackText, userRating }) => {
      dispatch(addFeedback(eventId, userId, { feedbackText, userRating }));
    },
  });

  return (
    <form onSubmit={handleSubmit}>
      <span>Ваша оценка</span>
      <div>
        <button type="button" onClick={() => setFieldValue("userRating", 1)}>
          1
        </button>
        <button type="button" onClick={() => setFieldValue("userRating", 2)}>
          2
        </button>
        <button type="button" onClick={() => setFieldValue("userRating", 3)}>
          3
        </button>
        <button type="button" onClick={() => setFieldValue("userRating", 4)}>
          4
        </button>
        <button type="button" onClick={() => setFieldValue("userRating", 5)}>
          5
        </button>
      </div>
      {errors.userRating ? <div>{errors.userRating}</div> : null}

      <span>Ваш отзыв</span>
      <textarea
        type="text"
        id="feedbackText"
        name="feedbackText"
        value={values.feedbackText}
        onChange={handleChange}
      />

      {pickerIsOpen && (
        <Picker
          set="apple"
          onSelect={emoji => setFieldValue("feedbackText", `${values.feedbackText}${emoji.native}`)}
          emojiSize={20}
        />
      )}
      <button type="button" onClick={() => setPicker(!pickerIsOpen)}>
        Смайлы
      </button>
      {errors.feedbackText ? <div>{errors.feedbackText}</div> : null}

      <button type="submit">Оставить отзыв</button>
    </form>
  );
};

export default FeedbackForm;
