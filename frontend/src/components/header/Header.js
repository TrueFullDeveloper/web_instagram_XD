import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./Header.module.scss";
import logo from "../../static/images/header/logo.svg";
//i18n
import { useTranslation } from "react-i18next";

const Header = () => {
  const { t } = useTranslation();

  return (
    <div className={styles.header}>
      <div>
        <NavLink to="/">
          <img src={logo} alt="nothing" />
        </NavLink>
      </div>
      <div className={styles.second_section}>
        <div className={`${styles.group_links} ${styles.first}`}>
          <NavLink to="/users">{t("components.header.usersLink")}</NavLink>
        </div>
        <div className={`${styles.group_links} ${styles.second}`}>
          <NavLink to="/chats">{t("components.header.chatsLink")}</NavLink>
        </div>
        <div className={`${styles.group_links} ${styles.third}`}>
          <NavLink to="/profile">{t("components.header.profileLink")}</NavLink>
        </div>
        <div className={`${styles.group_links} ${styles.fourth}`}>
          <NavLink to="/create_event">{t("components.header.createEventLink")}</NavLink>
        </div>
      </div>
    </div>
  );
};

export default Header;
