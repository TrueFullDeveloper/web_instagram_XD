import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { fetchLogin } from "../../store/api/authSlice";
import { useFormik } from "formik";
import * as yup from "yup";

const Login = () => {
  const dispatch = useDispatch();

  const { handleSubmit, handleChange, values, errors } = useFormik({
    initialValues: {
      email: "",
      password: "",
    },

    validationSchema: yup.object({
      email: yup.string().email("Should be valid Email").required("Email Shoud be Required"),
      password: yup.string().required("Password Shoud be Required"),
    }),

    onSubmit: ({ email, password }) => {
      dispatch(fetchLogin({ email, password }));
    },
  });

  return (
    <form onSubmit={handleSubmit}>
      <h1>Авторизация</h1>
      <input
        placeholder="Почта"
        type="email"
        id="email"
        name="email"
        value={values.email}
        onChange={handleChange}
      />
      {errors.email ? <div>{errors.email}</div> : null}

      <input
        placeholder="Пароль"
        type="password"
        id="password"
        name="password"
        value={values.password}
        onChange={handleChange}
      />
      {errors.password ? <div>{errors.password}</div> : null}

      <button type="submit">Войти</button>
      <Link to="/passwordreset">Забыли пароль?</Link>
      <Link to="/signin">Регистрация</Link>
    </form>
  );
};

export default Login;
