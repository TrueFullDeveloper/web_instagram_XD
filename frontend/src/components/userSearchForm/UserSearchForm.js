import React from "react";
import { useDispatch } from "react-redux";
import { searchUser } from "../../store/api/userListSlice";
import { useFormik } from "formik";
import * as yup from "yup";

const UserSearchForm = () => {
  const dispatch = useDispatch();
  const { handleSubmit, handleChange, values, errors } = useFormik({
    initialValues: {
      userQuery: "",
    },

    validationSchema: yup.object({
      userQuery: yup.string().required("User Query Shoud be Required"),
    }),

    onSubmit: ({ userQuery }) => {
      dispatch(searchUser(userQuery));
    },
  });

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <input
          type="search"
          name="userQuery"
          id="userQuery"
          placeholder="Поиск пользователей"
          value={values.userQuery}
          onChange={handleChange}
        />
        <button type="submit">Поиск</button>

        {errors.userQuery ? <div>{errors.userQuery}</div> : null}
      </div>
    </form>
  );
};

export default UserSearchForm;
