import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./ChatList.module.scss";
//i18n
import { useTranslation } from "react-i18next";

const ChatList = ({ chatList }) => {
  const { t } = useTranslation();

  return (
    <div className={styles.chat_list_section}>
      <h1>{t("pages.chatPage.userChatList")}</h1>

      {chatList.map(chatListItem => (
        <div className={styles.chat_room_box}>
          <NavLink to="/chatroom" key={chatListItem.chatId}>
            <div>
              <img src={chatListItem.companion.userPhoto} alt="No photo(" />
            </div>

            <div>
              <h2>{chatListItem.companion.userName}</h2>
            </div>
          </NavLink>
        </div>
      ))}
    </div>
  );
};

export default ChatList;
