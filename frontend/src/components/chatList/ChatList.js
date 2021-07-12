import React from "react";
import { NavLink } from "react-router-dom";
//import { useDispatch } from "react-redux";
//TODO: Fix NavLink (search string should be look like this: "chatroom2412")

const ChatList = ({ chatList }) => {
  return (
    <div>
      <h2>Список ваших чатов:</h2>

      {chatList.map(chatListItem => (
        <NavLink to="/chatroom" key={chatListItem.chatId}>
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
