import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { fetchSignup } from "../../store/api/authSlice";
import { useFormik } from "formik";
import * as yup from "yup";

const Signup = () => {
  const dispatch = useDispatch();

  const { handleSubmit, handleChange, values, errors } = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      passwordRep: "",
    },

    validationSchema: yup.object({
      name: yup
        .string()
        .min(1, "User Name must be longer than 1 character")
        .max(20, "User Name must be shorter than 20 characters")
        .required("User Name Shoud be Required"),
      email: yup.string().email("Should be valid Email").required("Email Shoud be Required"),
      password: yup
        .string()
        .min(6, "Password must be longer than 6 characters")
        .max(40, "Password must be shorter than 40 characters")
        .required("Password Shoud be Required"),
      passwordRep: yup.string().required("Repeat Password Please"),
    }),

    onSubmit: ({ name, email, password, passwordRep }) => {
      if (password === passwordRep) {
        dispatch(fetchSignup(name, email, password));
      } else {
        alert("Пароли не совпадатю");
      }
    },
  });

  return (
    <form onSubmit={handleSubmit}>
      <h1>РЕГИСТРАЦИЯ</h1>
      <input
        placeholder="Имя"
        type="text"
        id="name"
        name="name"
        value={values.name}
        onChange={handleChange}
      />
      {errors.name ? <div>{errors.name}</div> : null}

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

      <input
        placeholder="Повторите пароль"
        type="password"
        id="passwordRep"
        name="passwordRep"
        value={values.passwordRep}
        onChange={handleChange}
      />
      {errors.passwordRep ? <div>{errors.passwordRep}</div> : null}

      <button type="submit">Зарегистрироваться</button>
      <Link to="/login">Войти</Link>
    </form>
  );
};

export default Signup;
