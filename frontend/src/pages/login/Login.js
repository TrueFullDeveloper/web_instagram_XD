import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../../store/api/authSlice";
import { useFormik } from "formik";
import * as yup from "yup";
import styles from "./Login.module.scss";
//i18n
import { useTranslation } from "react-i18next";

const Login = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const { handleSubmit, handleChange, values, errors, touched } = useFormik({
    initialValues: {
      emailField: "",
      password: "",
    },

    validationSchema: yup.object({
      emailField: yup
        .string()
        .email(t("common.emailField.emailValidationError"))
        .required(t("common.emailField.emailNotRequiredError")),
      password: yup.string().required(t("common.passwordField.passwordNotRequiredError")),
    }),

    onSubmit: ({ emailField, password }) => {
      dispatch(login({ email: emailField, password }));
    },
  });

  return (
    <form onSubmit={handleSubmit} className={styles.login_form}>
      <h1>{t("pages.login.loginTitle")}</h1>

      <input
        placeholder={t("common.emailField.emailPlaceholder")}
        type="text"
        id="emailField"
        name="emailField"
        value={values.emailField}
        onChange={handleChange}
      />
      {touched.emailField && errors.emailField ? (
        <span className={styles.error_message}>{errors.emailField}</span>
      ) : null}

      <input
        placeholder={t("common.passwordField.passwordPlaceholder")}
        type="password"
        id="password"
        name="password"
        value={values.password}
        onChange={handleChange}
      />
      {touched.password && errors.password ? (
        <span className={styles.error_message}>{errors.password}</span>
      ) : null}

      <button type="submit">{t("pages.login.signinButton")}</button>
      <div>
        <Link to="/passwordreset">{t("pages.login.forgotPasswordLink")}</Link>
      </div>
      <div>
        <Link to="/signup">{t("pages.login.signupLink")}</Link>
      </div>
    </form>
  );
};

export default Login;
