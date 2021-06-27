import React from "react";
import { NavLink } from "react-router-dom";

export const Header = () => {
  return (
    <div>
      <div>
        <NavLink to="/">Новости</NavLink>
      </div>
    </div>
  );
};
