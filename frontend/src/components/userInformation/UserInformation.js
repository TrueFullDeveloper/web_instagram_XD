import React, { useState } from "react";
import SendMessageForm from "../sendMessageForm";

const UserInfomation = ({ userData }) => {
  const [messageFormIsOpen, setMessageForm] = useState(false);

  return (
    <div>
      <h1>{userData.userName}</h1>
      <img src={userData.userPhoto} />
      <br />
      <h2>Email:</h2>
      <p>{userData.email}</p>
      <h2>Обо мне</h2>
      <p>{userData.userInformation}</p>
      <h2>Контакты:</h2>

      {userData.phoneNumber && (
        <div>
          <h2>Телефон</h2>
          <p>{userData.phoneNumber}</p>
        </div>
      )}

      {userData.instagram && (
        <div>
          <h2>Instagram</h2>
          <p>{userData.instagram}</p>
        </div>
      )}

      {userData.facebook && (
        <div>
          <h2>Facebook</h2>
          <p>{userData.facebook}</p>
        </div>
      )}

      {userData.vkontacte && (
        <div>
          <h2>Vk</h2>
          <p>{userData.vkontacte}</p>
        </div>
      )}

      {messageFormIsOpen ? (
        <SendMessageForm setMessageForm={setMessageForm} userId={userData.userId} />
      ) : (
        <button type="button" onClick={() => setMessageForm(true)}>
          Написать сообщение
        </button>
      )}
    </div>
  );
};

export default UserInfomation;
