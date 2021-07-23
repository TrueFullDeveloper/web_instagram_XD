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
//i18n
import { useTranslation } from "react-i18next";

const VerificationCodeForm = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const loading = useSelector(selectResetLoading);
  const resetStatus = useSelector(selectResetStatus);

  const { handleSubmit, handleChange, values, errors, touched } = useFormik({
    initialValues: {
      code: "",
      password: "",
      passwordRep: "",
    },

    validationSchema: yup.object({
      code: yup.string().required(t("pages.passwordReset.codeNotRequiredError")),
      password: yup
        .string()
        .min(6, t("common.passwordField.passwordShortError"))
        .max(40, t("common.passwordField.passwordExceedsLimitError"))
        .required(t("common.passwordField.passwordNotRequiredError")),
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
        <h1>{t("pages.passwordReset.codeVerificationTitle")}</h1>
        <p>{t("pages.passwordReset.codeVerificationMessage")}</p>

        <input
          placeholder={t("pages.passwordReset.codePlaceholder")}
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
          placeholder={t("pages.passwordReset.newPasswordPlaceholder")}
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
          placeholder={t("common.passwordField.repeatPasswordPlaceholder")}
          type="password"
          id="passwordRep"
          name="passwordRep"
          value={values.passwordRep}
          onChange={handleChange}
        />

        {touched.passwordRep && errors.passwordRep ? (
          <span className={styles.error_message}>{errors.passwordRep}</span>
        ) : null}

        <button type="submit">{t("pages.passwordReset.recoveryButton")}</button>
      </form>
    );
  }

  if (resetStatus === "success") {
    return (
      <div className={styles.successful_message}>
        <h1>{t("pages.passwordReset.successRecoveryMessage")}</h1>
        <img src={successfulIcon} alt="" />

        <button type="button">
          <Link to="/login">Ок</Link>
        </button>
      </div>
    );
  }
};

export default VerificationCodeForm;
