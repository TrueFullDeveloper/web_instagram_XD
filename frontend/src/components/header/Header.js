import React from "react";
import { NavLink } from "react-router-dom";

export const Header = () => {
  return (
    <div>
      <div>
        <NavLink to="/">Главная</NavLink>
        <NavLink to="/profile">Мой Профиль</NavLink>
      </div>
    </div>
  );
};
