import React from "react";
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { fetchUser } from "../../store/api/userSlice";
import styles from "./UserList.module.scss";
//i18n
import { useTranslation } from "react-i18next";

const UserList = ({ userList }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  return (
    <div>
      <div className={styles.user_list_section}>
        <h1>{t("pages.usersPage.userListTitle")}</h1>
        {userList.map(userListItem => (
          <div className={styles.user_list_item} key={userListItem.userId}>
            <NavLink to="/user" onClick={() => dispatch(fetchUser(userListItem.userId))}>
              <img src={userListItem.userPhoto} alt="No photo(" />
            </NavLink>

            <NavLink to="/user" onClick={() => dispatch(fetchUser(userListItem.userId))}>
              <div>
                <h2>{userListItem.userName}</h2>
                <p>{userListItem.role}</p>
              </div>
            </NavLink>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserList;
