import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Loader } from "../../components/loader/Loader";
import {
  changePassword,
  sendEmail,
  selectResetLoading,
} from "../../reduxToolkit/api/passwordResetSlice";

// TODO: Add Normal Validation for Reset Form

export const PasswordReset = () => {
  const dispatch = useDispatch();
  const loading = useSelector(selectResetLoading);

  const [resetForm, setResetForm] = useState({
    email: "",
    code: "",
    password: "",
    passwordRep: "",
  });
  const [step, setStep] = useState(1);

  const onClick = () => {
    if (step === 1) {
      dispatch(sendEmail(resetForm.email));
      setStep(2);
    }

    if (step === 2) {
      dispatch(
        changePassword({
          code: resetForm.code,
          newPasswod: resetForm.password,
          newPasswodRep: resetForm.passwordRep,
        })
      );
      setStep(3);
    }
  };

  const onChange = event => {
    setResetForm({ ...resetForm, [event.target.name]: event.target.value });
  };

  if (loading) {
    return <Loader />;
  }

  if (step === 1) {
    return (
      <form>
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
          onChange={onChange}
        />
        <button type="button" onClick={onClick}>
          Отправить
        </button>
      </form>
    );
  }

  if (step === 2) {
    return (
      <form>
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
          value={resetForm.code}
          onChange={onChange}
        />
        <input
          placeholder="Новый Пароль"
          type="password"
          id="password"
          name="password"
          value={resetForm.password}
          onChange={onChange}
        />
        <input
          placeholder="Повторите Пароль"
          type="password"
          id="passwordRep"
          name="passwordRep"
          value={resetForm.passwordRep}
          onChange={onChange}
        />
        <button type="button" onClick={onClick}>
          Востановить
        </button>
      </form>
    );
  }

  if (step === 3) {
    return (
      <div>
        <h1>Вы успешно изменили свой пароль!</h1>
        <button type="submit">
          <Link to="/login">Ок</Link>
        </button>
      </div>
    );
  }
};
