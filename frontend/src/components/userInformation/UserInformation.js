import React, { useState } from "react";
import SendMessageForm from "../sendMessageForm";
import styles from "./UserInformation.module.scss";
//Icons
import emailIcon from "../../static/images/contactIcon/email.svg";
import phoneIcon from "../../static/images/contactIcon/phone.svg";
import instagramIcon from "../../static/images/contactIcon/instagram.svg";
import facebookIcon from "../../static/images/contactIcon/facebook.svg";
import vkIcon from "../../static/images/contactIcon/vk.svg";

const UserInformation = ({ userData }) => {
  const [messageFormIsOpen, setMessageForm] = useState(false);

  return (
    <div className={styles.user}>
      <div className={styles.about_section}>
        <img src={userData.userPhoto} alt="" />
        <h1>{userData.userName}</h1>
        <h2>Обо мне</h2>
        <p>{userData.userInformation}</p>
      </div>

      <div className={styles.contact_section}>
        <h2>Мои Контакты:</h2>

        <div>
          <span>
            <img src={emailIcon} alt="" />
            Email:
          </span>
          <p>{userData.email}</p>
        </div>

        {userData.phoneNumber ? (
          <div className={styles.contact_item}>
            <span>
              <img src={phoneIcon} alt="" />
              Телефон
            </span>
            <p>{userData.phoneNumber}</p>
          </div>
        ) : null}

        {userData.instagram ? (
          <div className={styles.contact_item}>
            <span>
              <img src={instagramIcon} alt="" />
              Instagram
            </span>
            <div>
              <a href={userData.instagram}>Мой Instagram</a>
            </div>
          </div>
        ) : null}

        {userData.facebook ? (
          <div className={styles.contact_item}>
            <span>
              <img src={facebookIcon} alt="" />
              Facebook
            </span>
            <div>
              <a href={userData.facebook}>Мой Facebook</a>
            </div>
          </div>
        ) : null}

        {userData.vkontacte ? (
          <div className={styles.contact_item}>
            <span>
              <img src={vkIcon} alt="" />
              Vk
            </span>
            <div>
              <a href={userData.vkontacte}>Мой Vk</a>
            </div>
          </div>
        ) : null}

        {messageFormIsOpen ? (
          <SendMessageForm setMessageForm={setMessageForm} userId={userData.userId} />
        ) : (
          <button type="button" onClick={() => setMessageForm(true)}>
            Написать сообщение
          </button>
        )}
      </div>
    </div>
  );
};

export default UserInformation;
