import React, { useEffect, useRef } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { profileUpdate } from "../../store/api/profileSlice";
import { selectUserId } from "../../store/api/authSlice";
import { createPortal } from "react-dom";
import styles from "./ProfileForm.module.scss";
//Icons
import emailIcon from "../../static/images/contactIcon/email.svg";
import phoneIcon from "../../static/images/contactIcon/phone.svg";
import instagramIcon from "../../static/images/contactIcon/instagram.svg";
import facebookIcon from "../../static/images/contactIcon/facebook.svg";
import vkIcon from "../../static/images/contactIcon/vk.svg";
//i18n
import { useTranslation } from "react-i18next";

//TODO: May be Add Validation for Every Url

const ProfileForm = ({ profileData, setEditModel }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const userId = useSelector(selectUserId);
  const profileFormModal = useRef(document.createElement("div"));

  useEffect(() => {
    document.body.appendChild(profileFormModal.current);

    return () => document.body.removeChild(profileFormModal.current);
  }, []);

  const { handleSubmit, handleChange, values, errors, touched } = useFormik({
    initialValues: {
      userName: profileData.userName || "",
      userPhoto: profileData.userPhoto || "",
      email: profileData.email || "",
      userInformation: profileData.userInformation || "",
      phoneNumber: profileData.phoneNumber || "",
      instagram: profileData.instagram || "",
      facebook: profileData.facebook || "",
      vkontakte: profileData.vkontakte || "",
    },

    validationSchema: yup.object({
      userName: yup
        .string()
        .min(1, t("common.userNameField.userNameShortError"))
        .max(20, t("common.userNameField.userNameExceedsLimitError"))
        .required(t("common.userNameField.userNameNotRequiredError")),
      email: yup
        .string()
        .email(t("common.emailField.emailValidationError"))
        .required(t("common.emailField.emailNotRequiredError")),
      userInformation: yup.string().max(400, t("pages.profile.aboutExceedsLimitError")),
      phoneNumber: yup.string().max(30, t("pages.profile.phoneExceedsLimitError")),
      instagram: yup.string().url(t("pages.profile.urlValidationError")),
      facebook: yup.string().url(t("pages.profile.urlValidationError")),
      vkontakte: yup.string().url(t("pages.profile.urlValidationError")),
    }),

    onSubmit: ({
      userName,
      userPhoto,
      email,
      userInformation,
      phoneNumber,
      instagram,
      facebook,
      vkontakte,
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
            vkontakte,
          },
          userId
        )
      );
    },
  });

  return createPortal(
    <div className={styles.profile_wrapper}>
      <form className={styles.profile_form} onSubmit={handleSubmit}>
        <div className={styles.about_section}>
          <img src={profileData.userPhoto} alt="No photo(" />

          <div>
            <input
              type="file"
              id="userPhoto"
              name="userPhoto"
              accept=".jpg, .jpeg, .png"
              onChange={handleChange}
            />
          </div>

          <div>
            <span>{t("pages.profile.userNameTitle")}</span>
            <input
              className={styles.name_field}
              type="text"
              id="userName"
              name="userName"
              value={values.userName}
              onChange={handleChange}
            />
          </div>

          {touched.userName && errors.userName ? (
            <span className={styles.error_message}>{errors.userName}</span>
          ) : null}

          <div>
            <span>{t("pages.profile.aboutTitle")}</span>
            <textarea
              className={styles.about_field}
              type="text"
              id="userInformation"
              name="userInformation"
              value={values.userInformation}
              onChange={handleChange}
            />
          </div>

          {touched.userInformation && errors.userInformation ? (
            <span className={styles.error_message}>{errors.userInformation}</span>
          ) : null}
        </div>

        <div className={styles.contact_section}>
          <div>
            <span>
              <img src={emailIcon} alt="" />
              Email:
            </span>
            <input
              className={styles.contact_field}
              type="text"
              id="email"
              name="email"
              value={values.email}
              onChange={handleChange}
            />
          </div>

          {touched.email && errors.email ? (
            <span className={styles.error_message}>{errors.email}</span>
          ) : null}

          <div>
            <span>
              <img src={phoneIcon} alt="" />
              {t("pages.profile.userPhoneTitle")}
            </span>
            <input
              className={styles.contact_field}
              type="text"
              id="phoneNumber"
              name="phoneNumber"
              value={values.phoneNumber}
              onChange={handleChange}
            />
          </div>

          {touched.phoneNumber && errors.phoneNumber ? (
            <span className={styles.error_message}>{errors.phoneNumber}</span>
          ) : null}

          <div>
            <span>
              <img src={instagramIcon} alt="" />
              Instagram
            </span>
            <input
              className={styles.contact_field}
              type="text"
              id="instagram"
              name="instagram"
              value={values.instagram}
              onChange={handleChange}
            />
          </div>

          {touched.instagram && errors.instagram ? (
            <span className={styles.error_message}>{errors.instagram}</span>
          ) : null}

          <div>
            <span>
              <img src={facebookIcon} alt="" />
              Facebook
            </span>
            <input
              className={styles.contact_field}
              type="text"
              id="facebook"
              name="facebook"
              value={values.facebook}
              onChange={handleChange}
            />
          </div>

          {touched.facebook && errors.facebook ? (
            <span className={styles.error_message}>{errors.facebook}</span>
          ) : null}

          <div>
            <span>
              <img src={vkIcon} alt="" />
              Vk
            </span>
            <input
              className={styles.contact_field}
              type="text"
              id="vkontakte"
              name="vkontakte"
              value={values.vkontakte}
              onChange={handleChange}
            />
          </div>

          {touched.vkontakte && errors.vkontakte ? (
            <span className={styles.error_message}>{errors.vkontakte}</span>
          ) : null}

          <button type="submit">{t("pages.profile.acceptChangesButton")}</button>

          <button type="button" onClick={() => setEditModel(false)}>
            {t("pages.profile.closeButton")}
          </button>
        </div>
      </form>
    </div>,
    profileFormModal.current
  );
};

export default ProfileForm;
