import { useEffect, useRef } from "react";
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
import fakeCompanionPhoto from "../static/images/fakeImages/fakeAuthor_1.jpg";

const fakeCompanion = {
  companionId: 15,
  companionName: "Альберт",
  companionPhoto: fakeCompanionPhoto,
  onlineStatus: true,
};

const fakeMessages = [
  {
    messageId: 10,
    authorName: "Bob",
    messageText: "What are you doing here?",
    createdAt: "11.12.2021",
    currentUser: true,
  },
  {
    messageId: 15,
    authorName: "Альберт",
    messageText: "Go back to work!",
    createdAt: "11.12.2021",
    currentUser: false,
  },
  {
    messageId: 10,
    authorName: "Bob",
    messageText: "What are you doing here?",
    createdAt: "11.12.2021",
    currentUser: true,
  },
  {
    messageId: 10,
    authorName: "Bob",
    messageText: "What are you doing here?",
    createdAt: "11.12.2021",
    currentUser: true,
  },
  {
    messageId: 15,
    authorName: "Альберт",
    messageText: "Go back to work!",
    createdAt: "11.12.2021",
    currentUser: false,
  },
  {
    messageId: 10,
    authorName: "Bob",
    messageText: "What are you doing here?",
    createdAt: "11.12.2021",
    currentUser: true,
  },
  {
    messageId: 15,
    authorName: "Альберт",
    messageText: "Go back to work!",
    createdAt: "11.12.2021",
    currentUser: false,
  },
  {
    messageId: 10,
    authorName: "Bob",
    messageText: "What are you doing here?",
    createdAt: "11.12.2021",
    currentUser: true,
  },
  {
    messageId: 15,
    authorName: "Альберт",
    messageText: "Go back to work!",
    createdAt: "11.12.2021",
    currentUser: false,
  },
];

const SERVER_URL = "http://localhost:5000";

export const useChat = chatId => {
  const dispatch = useDispatch();
  const userId = useSelector(selectUserId);

  //Upload Fake Data to Store
  dispatch(setChat({ messageList: fakeMessages, companion: fakeCompanion, chatId: 5 }));

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
