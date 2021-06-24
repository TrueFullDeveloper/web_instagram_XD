import React, { useState, Fragment } from "react";
import { Link } from "react-router-dom";

export const Login = () => {
  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
  });

  const onChange = event => {
    event.preventDefault();
    setLoginForm({ ...loginForm, [event.target.name]: event.target.value });
  };

  const onClick = () => {
    return;
  };

  return (
    <Fragment>
      <form>
        <h1>Авторизация</h1>
        <input
          placeholder="Почта"
          type="email"
          id="email"
          name="email"
          value={loginForm.email}
          onChange={onChange}
        />
        <input
          placeholder="Пароль"
          type="password"
          id="password"
          name="password"
          value={loginForm.password}
          onChange={onChange}
        />
        <button type="submit" onClick={onClick}>
          Войти
        </button>

        <Link to="/signup">Регистрация</Link>
      </form>
    </Fragment>
  );
};
