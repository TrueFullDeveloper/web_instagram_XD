import React from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../../components/loader";
import {
  changePassword,
  selectResetLoading,
  selectResetStatus,
} from "../../store/api/passwordResetSlice";
import { useFormik } from "formik";
import * as yup from "yup";
import successfulIcon from "../../static/images/resetPassword/successful_icon.svg";
import styles from "./VerificationCodeForm.module.scss";

const VerificationCodeForm = () => {
  const dispatch = useDispatch();
  const loading = useSelector(selectResetLoading);
  const resetStatus = useSelector(selectResetStatus);

  const { handleSubmit, handleChange, values, errors, touched } = useFormik({
    initialValues: {
      code: "",
      password: "",
      passwordRep: "",
    },

    validationSchema: yup.object({
      code: yup.string().required("Код должен быть указан"),
      password: yup
        .string()
        .min(6, "Password must be longer than 6 characters")
        .max(40, "Password must be shorter than 40 characters")
        .required("Password Shoud be Required"),
      passwordRep: yup.string().required("Repeat Password Please"),
    }),

    onSubmit: ({ code, password, passwordRep }) => {
      dispatch(
        changePassword({
          code,
          password,
          passwordRep,
        })
      );
    },
  });

  if (loading) {
    return <Loader />;
  }

  if (resetStatus != "success") {
    return (
      <form onSubmit={handleSubmit} className={styles.verification_code_form}>
        <h1>Введите код</h1>
        <p>
          Введите код для подтверждения сброса пароля. Код был выслан на указанный вами адрес
          электронной почты!
        </p>

        <input
          placeholder="Код"
          type="text"
          id="code"
          name="code"
          value={values.code}
          onChange={handleChange}
        />

        {touched.code && errors.code ? (
          <span className={styles.error_message}>{errors.code}</span>
        ) : null}

        <input
          placeholder="Новый Пароль"
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
          placeholder="Повторите Пароль"
          type="password"
          id="passwordRep"
          name="passwordRep"
          value={values.passwordRep}
          onChange={handleChange}
        />

        {touched.passwordRep && errors.passwordRep ? (
          <span className={styles.error_message}>{errors.passwordRep}</span>
        ) : null}

        <button type="submit">Востановить</button>
      </form>
    );
  }

  if (resetStatus === "success") {
    return (
      <div className={styles.successful_message}>
        <h1>Вы успешно изменили свой пароль!</h1>
        <img src={successfulIcon} alt="" />

        <button type="button">
          <Link to="/login">Ок</Link>
        </button>
      </div>
    );
  }
};

export default VerificationCodeForm;
