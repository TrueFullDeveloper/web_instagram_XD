import React, { useState, Fragment } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { fetchSignup } from "../../reduxToolkit/api/authSlice";

export const Signup = () => {
  const dispatch = useDispatch();

  const [signupForm, setSignupForm] = useState({
    name: "",
    email: "",
    password: "",
    passwordRep: "",
  });

  const onChange = event => {
    event.preventDefault();
    setSignupForm({ ...signupForm, [event.target.name]: event.target.value });
  };

  const onClick = () => {
    //TODO: Add Normal Validation
    if (
      signupForm.password > 6 &&
      signupForm.password === signupForm.passwordRep
    ) {
      dispatch(
        fetchSignup(signupForm.name, signupForm.email, signupForm.password)
      );
    } else {
      setSignupForm({ ...signupForm, password: "", passwordRep: "" });
      alert("Пароль не совпадает");
    }
  };

  return (
    <Fragment>
      <form>
        <h1>РЕГИСТРАЦИЯ</h1>
        <input
          placeholder="Имя"
          type="text"
          id="name"
          name="name"
          value={signupForm.name}
          onChange={onChange}
        />
        <input
          placeholder="Почта"
          type="email"
          id="email"
          name="email"
          value={signupForm.email}
          onChange={onChange}
        />
        <input
          placeholder="Пароль"
          type="password"
          id="password"
          name="password"
          value={signupForm.password}
          onChange={onChange}
        />
        <input
          placeholder="Повторите пароль"
          type="password"
          id="passwordRep"
          name="passwordRep"
          value={signupForm.passwordRep}
          onChange={onChange}
        />
        <button type="submit" onClick={onClick}>
          Зарегистрироваться
        </button>
        <Link to="/login">Войти</Link>
      </form>
    </Fragment>
  );
};
