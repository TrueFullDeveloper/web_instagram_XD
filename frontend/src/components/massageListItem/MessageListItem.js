import React from "react";
import { AiOutlineDelete } from "react-icons/ai";

const MessageListItem = ({ msgItem, removeMessage }) => {
  const { messageId, messageText, authorName, createdAt, currentUser } = msgItem;
  return (
    <div>
      <h3>{authorName}</h3>
      <p>{createdAt}</p>
      <h4>{messageText}</h4>
      {currentUser && (
        <button onClick={() => removeMessage(messageId)}>
          <AiOutlineDelete />
        </button>
      )}
    </div>
  );
};

export default MessageListItem;
