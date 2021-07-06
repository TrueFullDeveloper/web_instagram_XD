import React from "react";
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { fetchUser } from "../../store/api/userSlice";

const UserList = ({ userList }) => {
  const dispatch = useDispatch();

  return (
    <div>
      <h2>Список пользователей:</h2>
      {userList.map(userListItem => (
        <NavLink
          to="/user"
          key={userListItem.userId}
          onClick={() => dispatch(fetchUser(userListItem.userId))}
        >
          <div>
            <h1>{userListItem.userName}</h1>
            <div>
              <img src={userListItem.userPhoto} alt="No photo(" />
            </div>
          </div>
        </NavLink>
      ))}
    </div>
  );
};

export default UserList;
