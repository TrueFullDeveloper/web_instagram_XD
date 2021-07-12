import React from "react";
import { NavLink } from "react-router-dom";
//import { useDispatch } from "react-redux";
import { fetchUser } from "../../store/api/userSlice";

const ChatList = ({ chatList }) => {
  return (
    <div>
      <h2>Список ваших чатов:</h2>

      {chatList.map(chatListItem => (
        <NavLink to="/" key={chatListItem.chatId} onClick={() => console.log("Its work")}>
          <div>
            <h1>{chatListItem.companion.userName}</h1>
            <div>
              <img src={chatListItem.companion.userPhoto} alt="No photo(" />
            </div>
          </div>
        </NavLink>
      ))}
    </div>
  );
};

export default ChatList;
