import React, { useState } from "react";
import SendMessageForm from "../sendMessageForm";
import styles from "./UserInformation.module.scss";
//Icons
import emailIcon from "../../static/images/contactIcon/email.svg";
import phoneIcon from "../../static/images/contactIcon/phone.svg";
import instagramIcon from "../../static/images/contactIcon/instagram.svg";
import facebookIcon from "../../static/images/contactIcon/facebook.svg";
import vkIcon from "../../static/images/contactIcon/vk.svg";
//i18n
import { useTranslation } from "react-i18next";

const UserInformation = ({ userData }) => {
  const { t } = useTranslation();
  const [messageFormIsOpen, setMessageForm] = useState(false);

  return (
    <div className={styles.user}>
      <div className={styles.about_section}>
        <img src={userData.userPhoto} alt="" />
        <h1>{userData.userName}</h1>
        <h2>{t("pages.user.aboutTitle")}</h2>
        <p>{userData.userInformation}</p>
      </div>

      <div className={styles.contact_section}>
        <h2>{t("pages.user.contactSectionTitle")}</h2>

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
              {t("pages.user.userPhoneTitle")}
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
              <a href={userData.instagram}>{t("pages.user.userInstagramLink")}</a>
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
              <a href={userData.facebook}>{t("pages.user.userFacebookLink")}</a>
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
              <a href={userData.vkontacte}>{t("pages.user.userVkontakteLink")}</a>
            </div>
          </div>
        ) : null}

        {messageFormIsOpen ? (
          <SendMessageForm setMessageForm={setMessageForm} userId={userData.userId} />
        ) : (
          <button type="button" onClick={() => setMessageForm(true)}>
            {t("pages.user.sendMessageButton")}
          </button>
        )}
      </div>
    </div>
  );
};

export default UserInformation;
