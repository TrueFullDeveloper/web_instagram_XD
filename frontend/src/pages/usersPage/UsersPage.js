import React, { Fragment, useEffect } from "react";
import UserList from "../../components/userList";
import UserSearchForm from "../../components/userSearchForm";
import Loader from "../../components/loader";
import Footer from "../../components/footer/Footer";
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
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <UserSearchForm />
          <UserList userList={userList} />
          <Footer />
        </>
      )}
    </>
  );
};

export default User;
