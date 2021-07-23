import React, { useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { Picker } from "emoji-mart";
import styles from "./MessageForm.module.scss";
import "emoji-mart/css/emoji-mart.css";
//Icon
import smileIcon from "../../static/images/messageIcon/smile.svg";
//i18n
import { useTranslation } from "react-i18next";

const MessageForm = ({ userName, sendMessage }) => {
  const [pickerIsOpen, setPicker] = useState(false);
  const { t } = useTranslation();

  const { handleSubmit, handleChange, setFieldValue, values } = useFormik({
    initialValues: {
      messageText: "",
    },

    validationSchema: yup.object({
      messageText: yup
        .string()
        .max(400, t("pages.chatRoom.messageExceedsLimitError"))
        .required(t("pages.chatRoom.messageNotRequiredError")),
    }),

    onSubmit: ({ messageText }) => {
      sendMessage({ messageText, authorName: userName });
      setFieldValue("messageText", "");
    },
  });

  return (
    <div className={styles.message_section}>
      <form className={styles.message_form} onSubmit={handleSubmit}>
        <textarea
          className={styles.message_form_text}
          type="text"
          id="messageText"
          name="messageText"
          placeholder={t("pages.chatRoom.writeMessagePlaceholder")}
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
          <img src={smileIcon} alt={t("pages.chatRoom.smileButtonAlt")} />
        </button>

        <button className={styles.message_form_button} type="submit">
          {t("pages.chatRoom.sendMessageButton")}
        </button>
      </form>
    </div>
  );
};

export default MessageForm;
