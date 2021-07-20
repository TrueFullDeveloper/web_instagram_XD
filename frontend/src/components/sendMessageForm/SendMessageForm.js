import React, { useEffect, useRef, useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { selectUserId } from "../../store/api/authSlice";
import { createPortal } from "react-dom";
import { sendMessage } from "../../store/api/userSlice";
import { Picker } from "emoji-mart";
import "emoji-mart/css/emoji-mart.css";
import styles from "./SendMessageForm.module.scss";
//Icon
import smileIcon from "../../static/images/messageIcon/smile.svg";

const SendMessageForm = ({ setMessageForm, userId }) => {
  const dispatch = useDispatch();
  const authorId = useSelector(selectUserId);
  const sendMessageModal = useRef(document.createElement("div"));
  const [pickerIsOpen, setPicker] = useState(false);

  useEffect(() => {
    document.body.appendChild(sendMessageModal.current);

    return () => document.body.removeChild(sendMessageModal.current);
  }, []);

  const { handleSubmit, handleChange, setFieldValue, values } = useFormik({
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
    <div className={styles.message_wrapper}>
      <form className={styles.message_form} onSubmit={handleSubmit}>
        <textarea
          className={styles.message_form_text}
          type="text"
          id="messageText"
          name="messageText"
          placeholder="Написать сообщение"
          value={values.messageText}
          onChange={handleChange}
        />

        {pickerIsOpen && (
          <div className={styles.picker}>
            <Picker
              set="apple"
              onSelect={emoji => {
                setFieldValue("messageText", `${values.messageText}${emoji.native}`);
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
          <img src={smileIcon} alt="Смайлы" />
        </button>

        <button className={styles.message_form_button} type="submit">
          Отправить
        </button>

        <button
          type="button"
          className={styles.close_form_button}
          onClick={() => setMessageForm(false)}
        >
          Закрыть
        </button>
      </form>
    </div>,
    sendMessageModal.current
  );
};

export default SendMessageForm;
