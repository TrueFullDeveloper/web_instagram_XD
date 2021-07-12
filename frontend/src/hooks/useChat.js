import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import io from "socket.io-client";
import { selectUserId } from "../store/api/authSlice";
import { setChat } from "../store/api/chatSlice";

// Server Need:
//socket.on('chat:get', getChat) // getChat is Function
//socket.on('message:add', addMessage)
//socket.on('message:remove', removeMessage)
// and one emit
// socket.emit('chat', chat)

const SERVER_URL = "http://localhost:5000";

export const useChat = chatId => {
  const dispatch = useDispatch();
  const userId = useSelector(selectUserId);

  const socketRef = useRef(null);

  useEffect(() => {
    socketRef.current = io(SERVER_URL, {
      query: { chatId },
    });

    socketRef.current.emit("chat:get");

    socketRef.current.on("chat", chat => {
      const messageList = chat.messageList.map(msgItem =>
        msgItem.userId === userId ? { ...msgItem, currentUser: true } : msgItem
      );

      dispatch(setChat({ messageList, companion: chat.companion, chatId }));
    });

    return () => {
      socketRef.current.disconnect();
    };
  }, [chatId, userId]);

  const sendMessage = ({ messageText, senderName }) => {
    socketRef.current.emit("message:add", {
      userId,
      messageText,
      senderName,
    });
  };

  const removeMessage = msgId => {
    socketRef.current.emit("message:remove", msgId);
  };

  return { sendMessage, removeMessage };
};
