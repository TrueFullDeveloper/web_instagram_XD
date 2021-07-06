import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { userLogout } from "../../store/api/authSlice";
import ProfileForm from "../profileForm";

// const config = {
//   instagram: "url",
//   facebook: "url",
// };

// const iconUrl = config[contactItem.iconName] || "defaultUrl";

const ProfileInfomation = ({ profileData }) => {
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

      {profileData.phoneNumber ? (
        <>
          <h2>Телефон</h2>
          <p>{profileData.phoneNumber}</p>
        </>
      ) : null}

      {profileData.instagram ? (
        <>
          <h2>instagram</h2>
          <p>{profileData.instagram}</p>
        </>
      ) : null}

      {profileData.facebook ? (
        <>
          <h2>facebook</h2>
          <p>{profileData.facebook}</p>
        </>
      ) : null}

      {profileData.vkontacte ? (
        <>
          <h2>Vk</h2>
          <p>{profileData.vkontacte}</p>
        </>
      ) : null}

      {editModalIsOpen && <ProfileForm profileData={profileData} setEditModel={setEditModel} />}

      <button onClick={() => setEditModel(true)}>Редактировать Профиль</button>
      <button onClick={() => dispatch(userLogout())}>Выйти</button>
    </div>
  );
};

export default ProfileInfomation;
