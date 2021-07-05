import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../../components/loader";
import { changePassword, sendEmail, selectResetLoading } from "../../store/api/passwordResetSlice";
import { useFormik } from "formik";
import * as yup from "yup";

const PasswordReset = () => {
  const dispatch = useDispatch();
  const loading = useSelector(selectResetLoading);
  const [step, setStep] = useState(1);

  const { handleSubmit, handleChange, values, errors } = useFormik({
    initialValues: {
      email: "",
      code: "",
      password: "",
      passwordRep: "",
    },

    validationSchema: yup.object({
      email: yup.string().email("Should be valid Email").required("Email Shoud be Required"),
      code: yup.string().required("Code Shoud be Required"),
      password: yup
        .string()
        .min(6, "Password must be longer than 6 characters")
        .max(40, "Password must be shorter than 40 characters")
        .required("Password Shoud be Required"),
      passwordRep: yup.string().required("Repeat Password Please"),
    }),

    onSubmit: ({ email, code, password, passwordRep }) => {
      if (step === 1) {
        dispatch(sendEmail(email));
        setStep(2);
      }

      if (step === 2) {
        dispatch(
          changePassword({
            code,
            password,
            passwordRep,
          })
        );
        setStep(3);
      }
    },
  });

  if (loading) {
    return <Loader />;
  }

  if (step === 1) {
    return (
      <form onSubmit={handleSubmit}>
        <h1>Забыли пароль?</h1>
        <p>
          Для восстановления пароля укажите e-mail, на
          <br /> который зарегистрирована ваша учетная запись!
        </p>
        <input
          placeholder="Почта"
          type="email"
          id="email"
          name="email"
          value={resetForm.email}
          onChange={handleChange}
        />
        {errors.email ? <div>{errors.email}</div> : null}

        <button type="submit">Отправить</button>
      </form>
    );
  }

  if (step === 2) {
    return (
      <form onSubmit={handleSubmit}>
        <h1>Введите код</h1>
        <p>
          Введите код для подтверждения сброса пароля.
          <br /> Код был выслан на указанный вами адрес
          <br /> электронной почты!
        </p>
        <input
          placeholder="Код"
          type="text"
          id="code"
          name="code"
          value={values.code}
          onChange={handleChange}
        />
        {errors.code ? <div>{errors.code}</div> : null}

        <input
          placeholder="Новый Пароль"
          type="password"
          id="password"
          name="password"
          value={values.password}
          onChange={handleChange}
        />
        {errors.password ? <div>{errors.password}</div> : null}

        <input
          placeholder="Повторите Пароль"
          type="password"
          id="passwordRep"
          name="passwordRep"
          value={values.passwordRep}
          onChange={handleChange}
        />
        {errors.passwordRep ? <div>{errors.passwordRep}</div> : null}

        <button type="submit">Востановить</button>
      </form>
    );
  }

  if (step === 3) {
    return (
      <div>
        <h1>Вы успешно изменили свой пароль!</h1>
        <button type="button">
          <Link to="/login">Ок</Link>
        </button>
      </div>
    );
  }
};

export default PasswordReset;
