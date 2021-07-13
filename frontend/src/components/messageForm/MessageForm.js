import React from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { useState } from "react";
import { Picker } from "emoji-mart";
import "emoji-mart/css/emoji-mart.css";

const MessageForm = ({ userName, sendMessage }) => {
  const [pickerIsOpen, setPicker] = useState(false);

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
      sendMessage({ messageText, authorName: userName });
      setFieldValue("messageText", "");
    },
  });

  return (
    <form onSubmit={handleSubmit}>
      <textarea
        type="text"
        id="messageText"
        name="messageText"
        value={values.messageText}
        onChange={handleChange}
      />
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
    </form>
  );
};

export default MessageForm;
