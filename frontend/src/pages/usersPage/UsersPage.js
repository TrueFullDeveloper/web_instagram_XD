import React, { Fragment, useEffect } from "react";
import UserList from "../../components/userList";
import Loader from "../../components/loader";
import { useSelector, useDispatch } from "react-redux";
import {
  selectUserListLoading,
  selectUserList,
  fetchUserList,
} from "../../store/api/userListSlice";

const User = () => {
  const loading = useSelector(selectUserListLoading);
  const userList = useSelector(selectUserList);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUserList());
    // eslint-disable-next-line
  }, []);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <UserList userList={userList} />
        </Fragment>
      )}
    </Fragment>
  );
};

export default User;
