import React from "react";
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { fetchUser } from "../../store/api/userSlice";
import styles from "./UserList.module.scss";

const UserList = ({ userList }) => {
  const dispatch = useDispatch();

  return (
    <div>
      <div className={styles.user_list_section}>
        <h1>Список пользователей:</h1>
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
