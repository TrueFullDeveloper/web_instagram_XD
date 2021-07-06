import React from "react";
import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <div>
      <NavLink to="/">Главная</NavLink>
      <NavLink to="/profile">Мой Профиль</NavLink>
      <NavLink to="/users">Пользователи</NavLink>
    </div>
  );
};

export default Header;
