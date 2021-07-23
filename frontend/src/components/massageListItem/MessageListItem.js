import React from "react";
import styles from "./MessageListItem.module.scss";
//i18n
import { useTranslation } from "react-i18next";

const MessageListItem = ({ msgItem, removeMessage }) => {
  const { messageId, messageText, createdAt, currentUser } = msgItem;
  const { t } = useTranslation();

  return (
    <div
      className={`${styles.message_wrapper} ${
        currentUser ? styles.current_user : styles.companion
      }`}
    >
      <div className={`${styles.message_item} `}>
        <span>{createdAt}</span>
        <p>{messageText}</p>
        {currentUser && (
          <button onClick={() => removeMessage(messageId)}>
            {t("pages.chatRoom.deleteButton")}
          </button>
        )}
      </div>
    </div>
  );
};

export default MessageListItem;
