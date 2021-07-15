import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { fetchSignup } from "../../store/api/authSlice";
import { useFormik } from "formik";
import * as yup from "yup";
import styles from "./Signup.module.scss";

const Signup = () => {
  const dispatch = useDispatch();

  const { handleSubmit, handleChange, values, errors, touched } = useFormik({
    initialValues: {
      name: "",
      emailField: "",
      password: "",
      passwordRep: "",
    },

    validationSchema: yup.object({
      name: yup
        .string()
        .min(1, "User Name must be longer than 1 character")
        .max(20, "User Name must be shorter than 20 characters")
        .required("User Name Shoud be Required"),
      emailField: yup.string().email("Should be valid Email").required("Email Shoud be Required"),
      password: yup
        .string()
        .min(6, "Password must be longer than 6 characters")
        .max(40, "Password must be shorter than 40 characters")
        .required("Password Shoud be Required"),
      passwordRep: yup.string().required("Repeat Password Please"),
    }),

    onSubmit: ({ name, emailField, password, passwordRep }) => {
      if (password === passwordRep) {
        dispatch(fetchSignup(name, emailField, password));
      } else {
        alert("Пароли не совпадатю");
      }
    },
  });

  return (
    <form onSubmit={handleSubmit} className={styles.signup_form}>
      <h1>РЕГИСТРАЦИЯ</h1>

      <input
        placeholder="Имя"
        type="text"
        id="name"
        name="name"
        value={values.name}
        onChange={handleChange}
        className={styles.user_name_field}
      />
      {touched.name && errors.name ? (
        <span className={styles.error_message}>{errors.name}</span>
      ) : null}

      <input
        placeholder="Почта"
        type="text"
        id="emailField"
        name="emailField"
        value={values.emailField}
        onChange={handleChange}
        className={styles.email_field}
      />
      {touched.emailField && errors.emailField ? (
        <span className={styles.error_message}>{errors.emailField}</span>
      ) : null}

      <input
        placeholder="Пароль"
        type="password"
        id="password"
        name="password"
        value={values.password}
        onChange={handleChange}
      />
      {touched.password && errors.password ? (
        <span className={styles.error_message}>{errors.password}</span>
      ) : null}

      <input
        placeholder="Повторите пароль"
        type="password"
        id="passwordRep"
        name="passwordRep"
        value={values.passwordRep}
        onChange={handleChange}
      />
      {touched.passwordRep && errors.passwordRep ? (
        <span className={styles.error_message}>{errors.passwordRep}</span>
      ) : null}

      <button type="submit">Зарегистрироваться</button>
      <Link to="/login">Войти</Link>
    </form>
  );
};

export default Signup;
