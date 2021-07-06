import React, { useState } from "react";
import { useDispatch } from "react-redux";

const UserInfomation = ({ userData }) => {
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

      {userData.phoneNumber ? (
        <>
          <h2>Телефон</h2>
          <p>{userData.phoneNumber}</p>
        </>
      ) : null}

      {userData.instagram ? (
        <>
          <h2>Instagram</h2>
          <p>{userData.instagram}</p>
        </>
      ) : null}

      {userData.facebook ? (
        <>
          <h2>Facebook</h2>
          <p>{userData.facebook}</p>
        </>
      ) : null}

      {userData.vkontacte ? (
        <>
          <h2>Vk</h2>
          <p>{userData.vkontacte}</p>
        </>
      ) : null}
    </div>
  );
};

export default UserInfomation;
