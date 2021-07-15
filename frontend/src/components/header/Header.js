import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./Header.module.scss";
import logo from "../../static/images/header/logo.svg";

const Header = () => {
  return (
    <div className={styles.header}>
      <div>
        <NavLink to="/">
          <img src={logo} alt="nothing" />
        </NavLink>
      </div>
      <div className={styles.second_section}>
        <div className={`${styles.group_links} ${styles.first}`}>
          <NavLink to="/users">Пользователи</NavLink>
        </div>
        <div className={`${styles.group_links} ${styles.second}`}>
          <NavLink to="/chats">Ваши чаты</NavLink>
        </div>
        <div className={`${styles.group_links} ${styles.third}`}>
          <NavLink to="/profile">Профиль</NavLink>
        </div>
        <div className={`${styles.group_links} ${styles.fourth}`}>
          <NavLink to="/create_event">Добавить мероприятие</NavLink>
        </div>
      </div>
    </div>
  );
};

export default Header;
