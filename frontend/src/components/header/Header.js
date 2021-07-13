import React from "react";
import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <div>
      <NavLink to="/">Главная</NavLink>
      <NavLink to="/profile">Мой Профиль</NavLink>
      <NavLink to="/users">Пользователи</NavLink>
      <NavLink to="/chats">Ваши чаты</NavLink>
      <NavLink to="/create_event">Добавить мероприятие</NavLink>
    </div>
  );
};

export default Header;
