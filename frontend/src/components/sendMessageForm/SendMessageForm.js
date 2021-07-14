import React, { useEffect, useRef, useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { selectUserId } from "../../store/api/authSlice";
import { createPortal } from "react-dom";
import { sendMessage } from "../../store/api/userSlice";
import { Picker } from "emoji-mart";
import "emoji-mart/css/emoji-mart.css";

const SendMessageForm = ({ setMessageForm, userId }) => {
  const dispatch = useDispatch();
  const authorId = useSelector(selectUserId);
  const sendMessageModal = useRef(document.createElement("div"));
  const [pickerIsOpen, setPicker] = useState(false);

  useEffect(() => {
    document.body.appendChild(sendMessageModal.current);

    return () => document.body.removeChild(sendMessageModal.current);
  }, []);

  const { handleSubmit, handleChange, setFieldValue, values, errors } = useFormik({
    initialValues: {
      messageText: "",
    },

    validationSchema: yup.object({
      messageText: yup
        .string()
        .max(400, "Message must be shorter than 400 characters")
        .required("Message is not Required"),
    }),

    onSubmit: ({ messageText }) => {
      dispatch(sendMessage(userId, authorId, messageText));
      setFieldValue("messageText", "");
      setMessageForm(false);
    },
  });

  return createPortal(
    <form onSubmit={handleSubmit}>
      <textarea
        type="text"
        id="messageText"
        name="messageText"
        value={values.messageText}
        onChange={handleChange}
      />
      {errors.messageText ? <div>{errors.messageText}</div> : null}

      {pickerIsOpen && (
        <Picker
          set="apple"
          onSelect={emoji => setFieldValue("messageText", `${values.messageText}${emoji.native}`)}
          emojiSize={20}
        />
      )}
      <button type="button" onClick={() => setPicker(!pickerIsOpen)}>
        Смайлы
      </button>

      <button type="submit">Отправить</button>
    </form>,
    sendMessageModal.current
  );
};

export default SendMessageForm;
