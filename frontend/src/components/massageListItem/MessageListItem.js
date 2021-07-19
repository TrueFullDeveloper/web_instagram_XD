import React from "react";
import styles from "./MessageListItem.module.scss";

const MessageListItem = ({ msgItem, removeMessage }) => {
  const { messageId, messageText, createdAt, currentUser } = msgItem;
  return (
    <div
      className={`${styles.message_wrapper} ${
        currentUser ? styles.current_user : styles.companion
      }`}
    >
      <div className={`${styles.message_item} `}>
        <span>{createdAt}</span>
        <p>{messageText}</p>
        {currentUser && <button onClick={() => removeMessage(messageId)}>Удалить</button>}
      </div>
    </div>
  );
};

export default MessageListItem;
