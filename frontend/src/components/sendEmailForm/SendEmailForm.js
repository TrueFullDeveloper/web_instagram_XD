import React from "react";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../../components/loader";
import { sendEmail, selectResetLoading } from "../../store/api/passwordResetSlice";
import { useFormik } from "formik";
import * as yup from "yup";
import styles from "./SendEmailForm.module.scss";
//i18n
import { useTranslation } from "react-i18next";

const SendEmailForm = ({ setResetStep }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const loading = useSelector(selectResetLoading);

  const { handleSubmit, handleChange, values, errors, touched } = useFormik({
    initialValues: {
      emailField: "",
    },

    validationSchema: yup.object({
      emailField: yup
        .string()
        .email(t("common.emailField.emailValidationError"))
        .required(t("common.emailField.emailNotRequiredError")),
    }),

    onSubmit: ({ emailField }) => {
      dispatch(sendEmail(emailField));
      setResetStep(2);
    },
  });

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <form onSubmit={handleSubmit} className={styles.send_email_form}>
          <h1>{t("pages.passwordReset.forgotPasswordTitle")}</h1>
          <p>{t("pages.passwordReset.forgotPasswordMessage")}</p>
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

          <button type="submit">{t("pages.passwordReset.sendEmailButton")}</button>
        </form>
      )}
    </>
  );
};

export default SendEmailForm;
