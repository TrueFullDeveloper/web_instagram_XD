import React from "react";
import { useDispatch } from "react-redux";
import { searchUser } from "../../store/api/userListSlice";
import { useFormik } from "formik";
import * as yup from "yup";
import styles from "./UserSearchForm.module.scss";
//i18n
import { useTranslation } from "react-i18next";

const UserSearchForm = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const { handleSubmit, handleChange, values } = useFormik({
    initialValues: {
      userQuery: "",
    },

    validationSchema: yup.object({
      userQuery: yup.string().required(),
    }),

    onSubmit: ({ userQuery }) => {
      dispatch(searchUser(userQuery));
    },
  });

  return (
    <form onSubmit={handleSubmit}>
      <div className={styles.search_form}>
        <input
          type="search"
          name="userQuery"
          id="userQuery"
          placeholder={t("pages.usersPage.userSearchPlaceholder")}
          value={values.userQuery}
          onChange={handleChange}
        />
        <button type="submit">{t("pages.usersPage.userSearchButton")}</button>
      </div>
    </form>
  );
};

export default UserSearchForm;
