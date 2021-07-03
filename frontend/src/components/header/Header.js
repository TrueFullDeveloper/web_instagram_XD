import React from "react";
import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <div>
      <div>
        <NavLink to="/">Главная</NavLink>
        <NavLink to="/profile">Мой Профиль</NavLink>
      </div>
    </div>
  );
};

export default Header;
