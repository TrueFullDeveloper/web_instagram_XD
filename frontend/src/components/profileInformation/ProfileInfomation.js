import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../store/api/authSlice";
import ProfileForm from "../profileForm";
import styles from "./ProfileInformation.module.scss";
//Icons
import emailIcon from "../../static/images/contactIcon/email.svg";
import phoneIcon from "../../static/images/contactIcon/phone.svg";
import instagramIcon from "../../static/images/contactIcon/instagram.svg";
import facebookIcon from "../../static/images/contactIcon/facebook.svg";
import vkIcon from "../../static/images/contactIcon/vk.svg";

const ProfileInformation = ({ profileData }) => {
  const dispatch = useDispatch();
  const [editModalIsOpen, setEditModel] = useState(false);

  return (
    <div className={styles.profile}>
      <div className={styles.about_section}>
        <img src={profileData.userPhoto} alt="" />
        <h1>{profileData.userName}</h1>
        <h2>Обо мне</h2>
        <p>{profileData.userInformation}</p>
      </div>

      <div className={styles.contact_section}>
        <h2>Мои Контакты:</h2>

        <div>
          <span>
            <img src={emailIcon} alt="" />
            Email:
          </span>
          <p>{profileData.email}</p>
        </div>

        {profileData.phoneNumber ? (
          <div className={styles.contact_item}>
            <span>
              <img src={phoneIcon} alt="" />
              Телефон
            </span>
            <p>{profileData.phoneNumber}</p>
          </div>
        ) : null}

        {profileData.instagram ? (
          <div className={styles.contact_item}>
            <span>
              <img src={instagramIcon} alt="" />
              Instagram
            </span>
            <div>
              <a href={profileData.instagram}>Мой Instagram</a>
            </div>
          </div>
        ) : null}

        {profileData.facebook ? (
          <div className={styles.contact_item}>
            <span>
              <img src={facebookIcon} alt="" />
              Facebook
            </span>
            <div>
              <a href={profileData.facebook}>Мой Facebook</a>
            </div>
          </div>
        ) : null}

        {profileData.vkontacte ? (
          <div className={styles.contact_item}>
            <span>
              <img src={vkIcon} alt="" />
              Vk
            </span>
            <div>
              <a href={profileData.vkontacte}>Мой Vk</a>
            </div>
          </div>
        ) : null}

        {editModalIsOpen && <ProfileForm profileData={profileData} setEditModel={setEditModel} />}

        <button type="button" onClick={() => setEditModel(true)}>
          Редактировать Профиль
        </button>
        <button onClick={() => dispatch(logout())}>Выйти</button>
      </div>
    </div>
  );
};

export default ProfileInformation;
