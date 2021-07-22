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
        .min(1, "Имя должно содержать больше одного символа")
        .max(20, "Имя не должно содерать больше 20 символов")
        .required("Имя должно быть указано"),
      emailField: yup
        .string()
        .email("Должена быть указана адрес электроной почты")
        .required("Вы не указали адрес электронной почты"),
      password: yup
        .string()
        .min(6, "Пароль должен содерать 6 или более символов")
        .max(40, "Пароль не должен содерать больше 40 символов")
        .required("Пароль должен быть указан"),
      passwordRep: yup.string().required("Повторите пароль, пожалуйста"),
    }),

    onSubmit: ({ name, emailField, password, passwordRep }) => {
      if (password === passwordRep) {
        dispatch(fetchSignup(name, emailField, password));
      } else {
        alert("Пароли не совпадают");
      }
    },
  });

  return (
    <form onSubmit={handleSubmit} className={styles.signup_form}>
      <h1>Регистрация</h1>

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
