import React, { Fragment, useState } from "react";
import { useDispatch } from "react-redux";
import { userLogout } from "../../reduxToolkit/api/authSlice";
import { ProfileForm } from "../profileForm/ProfileForm";

export const ProfileInfomation = ({ profileData }) => {
  const dispatch = useDispatch();
  const [editModalIsOpen, setEditModel] = useState(false);

  return (
    <div>
      <h1>{profileData.userName}</h1>
      <img src={profileData.userPhoto} />
      <br />
      <h2>Email:</h2>
      <p>{profileData.email}</p>
      <h2>Обо мне</h2>
      <p>{profileData.userInformation}</p>
      <h2>Контакты:</h2>
      <br />
      {profileData.contactInformation.map(contactItem => (
        <Fragment>
          <span>{contactItem.communicationWay}</span>
          <p>{contactItem.contact}</p>
        </Fragment>
      ))}

      {editModalIsOpen && <ProfileForm profileData={profileData} setEditModel={setEditModel} />}

      <button onClick={() => setEditModel(true)}>Редактировать Профиль</button>
      <button onClick={() => dispatch(userLogout())}>Выйти</button>
    </div>
  );
};
