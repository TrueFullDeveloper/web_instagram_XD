import React from "react";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../../components/loader";
import { sendEmail, selectResetLoading } from "../../store/api/passwordResetSlice";
import { useFormik } from "formik";
import * as yup from "yup";
import styles from "./SendEmailForm.module.scss";

const SendEmailForm = ({ setResetStep }) => {
  const dispatch = useDispatch();
  const loading = useSelector(selectResetLoading);

  const { handleSubmit, handleChange, values, errors, touched } = useFormik({
    initialValues: {
      emailField: "",
    },

    validationSchema: yup.object({
      emailField: yup.string().email("Should be valid Email").required("Email Shoud be Required"),
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
          <h1>Забыли пароль?</h1>
          <p>
            Для восстановления пароля укажите e-mail, на который зарегистрирована ваша учетная
            запись!
          </p>
          <input
            placeholder="Почта"
            type="text"
            id="emailField"
            name="emailField"
            value={values.emailField}
            onChange={handleChange}
          />
          {touched.emailField && errors.emailField ? (
            <span className={styles.error_message}>{errors.emailField}</span>
          ) : null}

          <button type="submit">Отправить</button>
        </form>
      )}
    </>
  );
};

export default SendEmailForm;
