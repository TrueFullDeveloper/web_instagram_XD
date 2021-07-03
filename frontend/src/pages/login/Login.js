import React, { useState, Fragment } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { fetchLogin } from "../../store/api/authSlice";

const Login = () => {
  const dispatch = useDispatch();

  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
  });

  const onChange = event => {
    event.preventDefault();
    setLoginForm({ ...loginForm, [event.target.name]: event.target.value });
  };

  const onClick = () => {
    dispatch(fetchLogin({ email: loginForm.email, password: loginForm.password }));
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
        <Link to="/passwordreset">Забыли пароль?</Link>
        <Link to="/signin">Регистрация</Link>
      </form>
    </Fragment>
  );
};

export default Login;
