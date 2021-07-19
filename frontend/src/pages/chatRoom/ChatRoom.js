import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useChat } from "../../hooks/useChat";
import { selectUserName } from "../../store/api/profileSlice";
import { selectCompanion, selectMessageList } from "../../store/api/chatSlice";
import { fetchUser } from "../../store/api/userSlice";
import MessageForm from "../../components/messageForm";
import MessageList from "../../components/messageList";
import styles from "./ChatRoom.module.scss";

const ChatRoom = ({ chatId }) => {
  const dispatch = useDispatch();
  const { sendMessage, removeMessage } = useChat(chatId);
  const userName = useSelector(selectUserName);
  const companion = useSelector(selectCompanion);
  const messageList = useSelector(selectMessageList);

  return (
    <>
      <div className={styles.companion_profile}>
        <NavLink to="/user" onClick={() => dispatch(fetchUser(companion.companionId))}>
          <img src={companion.companionPhoto} alt="Nothing(" />
        </NavLink>
        <NavLink to="/user" onClick={() => dispatch(fetchUser(companion.companionId))}>
          <div>
            <h2>{companion.companionName}</h2>
            {companion.onlineStatus ? <span>Online</span> : <span>Offline</span>}
          </div>
        </NavLink>
      </div>
      <MessageList messageList={messageList} removeMessage={removeMessage} />
      <MessageForm userName={userName} sendMessage={sendMessage} />
    </>
  );
};

export default ChatRoom;
