import React from "react";
import { useRef, useEffect } from "react";
import MessageListItem from "../massageListItem";
import styles from "./MessageList.module.scss";

const MessageList = ({ messageList, removeMessage }) => {
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messageList]);

  return (
    <div className={styles.message_list_sector}>
      {messageList.map(msgItem => (
        <MessageListItem key={msgItem.messageId} msgItem={msgItem} removeMessage={removeMessage} />
      ))}
      <span ref={messagesEndRef}></span>
    </div>
  );
};

export default MessageList;
