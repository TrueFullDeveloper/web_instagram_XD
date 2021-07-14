import React, { useEffect, useRef } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { profileUpdate } from "../../store/api/profileSlice";
import { selectUserId } from "../../store/api/authSlice";
import { createPortal } from "react-dom";

const ProfileForm = ({ profileData, setEditModel }) => {
  const dispatch = useDispatch();
  const userId = useSelector(selectUserId);
  const profileFormModal = useRef(document.createElement("div"));

  useEffect(() => {
    document.body.appendChild(profileFormModal.current);

    return () => document.body.removeChild(profileFormModal.current);
  }, []);

  const { handleSubmit, handleChange, values, errors, handleBlur } = useFormik({
    initialValues: {
      userName: profileData.userName,
      userPhoto: profileData.userPhoto,
      email: profileData.email,
      userInformation: profileData.userInformation,
      phoneNumber: profileData.phoneNumber,
      instagram: profileData.instagram,
      facebook: profileData.facebook,
      vkontacte: profileData.vkontacte,
    },

    validationSchema: yup.object({
      userName: yup
        .string()
        .max(20, "User must be shorter than 20 characters")
        .required("User Name is not Required"),
      email: yup
        .string()
        .max(30, "Email must be shorter than 30 characters")
        .email("Should be valid Email")
        .required("Email is not Required"),
      userInformation: yup
        .string()
        .max(400, "User information must be shorter than 400 characters"),
      phoneNumber: yup.string().max(30, "Phone number must be shorter than 30 characters"),
      instagram: yup.string(),
      facebook: yup.string(),
      vkontacte: yup.string(),
    }),

    onSubmit: ({
      userName,
      userPhoto,
      email,
      userInformation,
      phoneNumber,
      instagram,
      facebook,
      vkontacte,
    }) => {
      setEditModel(false);
      dispatch(
        profileUpdate(
          {
            userName,
            userPhoto,
            email,
            userInformation,
            phoneNumber,
            instagram,
            facebook,
            vkontacte,
          },
          userId
        )
      );
    },
  });

  return createPortal(
    <div>
      <form onSubmit={handleSubmit}>
        <span>Имя</span>
        <input
          type="text"
          id="userName"
          name="userName"
          value={values.userName}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {errors.userName ? <div>{errors.userName}</div> : null}

        <img src={profileData.userPhoto} />
        <input
          type="file"
          id="userPhoto"
          name="userPhoto"
          accept=".jpg, .jpeg, .png"
          onChange={handleChange}
        />

        <span>Email</span>
        <input
          type="email"
          id="email"
          name="email"
          value={values.email}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {errors.email ? <div>{errors.email}</div> : null}

        <span>Обо мне</span>
        <textarea
          type="text"
          id="userInformation"
          name="userInformation"
          value={values.userInformation}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {errors.userInformation ? <div>{errors.userInformation}</div> : null}

        {values.phoneNumber ? (
          <>
            <span>Телефон</span>
            <input
              type="text"
              id="phoneNumber"
              name="phoneNumber"
              value={values.phoneNumber}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </>
        ) : null}
        {errors.phoneNumber ? <div>{errors.phoneNumber}</div> : null}

        {values.instagram ? (
          <>
            <span>Instagram</span>
            <input
              type="text"
              id="instagram"
              name="instagram"
              value={values.instagram}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </>
        ) : null}
        {errors.instagram ? <div>{errors.instagram}</div> : null}

        {values.facebook ? (
          <>
            <span>Facebook</span>
            <input
              type="text"
              id="facebook"
              name="facebook"
              value={values.facebook}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </>
        ) : null}
        {errors.facebook ? <div>{errors.facebook}</div> : null}

        {values.vkontacte ? (
          <>
            <span>Вконтакте</span>
            <input
              type="text"
              id="vkontacte"
              name="vkontacte"
              value={values.vkontacte}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </>
        ) : null}
        {errors.vkontacte ? <div>{errors.vkontacte}</div> : null}

        <button type="submit">Принять изменения</button>
      </form>

      <button onClick={() => setEditModel(false)}>Закрыть</button>
    </div>,
    profileFormModal.current
  );
};

export default ProfileForm;
