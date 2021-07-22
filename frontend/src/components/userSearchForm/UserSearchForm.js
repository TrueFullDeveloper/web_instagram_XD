import React from "react";
import { useDispatch } from "react-redux";
import { searchUser } from "../../store/api/userListSlice";
import { useFormik } from "formik";
import * as yup from "yup";
import styles from "./UserSearchForm.module.scss";

const UserSearchForm = () => {
  const dispatch = useDispatch();

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
          placeholder="Поиск пользователей"
          value={values.userQuery}
          onChange={handleChange}
        />
        <button type="submit">Поиск</button>
      </div>
    </form>
  );
};

export default UserSearchForm;
