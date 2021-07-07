import React, { Fragment, useEffect } from "react";
import UserList from "../../components/userList";
import UserSearchForm from "../../components/userSearchForm";
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
          <UserSearchForm />
          <UserList userList={userList} />
        </Fragment>
      )}
    </Fragment>
  );
};

export default User;
