import React, { Fragment } from "react";
import UserInformation from "../../components/userInformation";
import Loader from "../../components/loader";
import { useSelector } from "react-redux";
import { selectUserLoading, selectUser } from "../../store/api/userSlice";

const User = () => {
  const loading = useSelector(selectUserLoading);
  const userData = useSelector(selectUser);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <UserInformation userData={userData} />
        </Fragment>
      )}
    </Fragment>
  );
};

export default User;
