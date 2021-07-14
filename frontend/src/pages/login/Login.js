import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { fetchLogin } from "../../store/api/authSlice";
import { useFormik } from "formik";
import * as yup from "yup";
import styles from "./Login.module.scss";

const Login = () => {
  const dispatch = useDispatch();

  const { handleSubmit, handleChange, values, errors } = useFormik({
    initialValues: {
      emailField: "",
      password: "",
    },

    validationSchema: yup.object({
      emailField: yup.string().email("Should be valid Email").required("Email Shoud be Required"),
      password: yup.string().required("Password Shoud be Required"),
    }),

    onSubmit: ({ emailField, password }) => {
      dispatch(fetchLogin({ emailField, password }));
    },
  });

  return (
    <form onSubmit={handleSubmit} className={styles.login_form}>
      <h1>Авторизация</h1>
      {errors.emailField ? <span className={styles.error_message}>{errors.emailField}</span> : null}
      <input
        placeholder="Почта"
        type="text"
        id="emailField"
        name="emailField"
        value={values.emailField}
        onChange={handleChange}
      />
      {errors.password ? <span className={styles.error_message}>{errors.password}</span> : null}
      <input
        placeholder="Пароль"
        type="password"
        id="password"
        name="password"
        value={values.password}
        onChange={handleChange}
      />

      <button type="submit">Войти</button>
      <div>
        <Link to="/passwordreset">Забыли пароль?</Link>
      </div>
      <div>
        <Link to="/signup">Регистрация</Link>
      </div>
    </form>
  );
};

export default Login;
