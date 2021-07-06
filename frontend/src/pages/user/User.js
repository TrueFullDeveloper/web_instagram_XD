import React, { Fragment } from "react";
import UserInfomation from "../../components/userInfomation";
import Loader from "../../components/loader";
import { useSelector } from "react-redux";
import { selectUserLoading, selectUser } from "../../store/api/userSlice";

const User = () => {
  const loading = useSelector(selectUserLoading);
  const userData = useSelector(selectUser);
  //const userId = useSelector(selectUserId);

  //const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(fetchUser(userId));
  //   // eslint-disable-next-line
  // }, []);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <UserInfomation userData={userData} />
        </Fragment>
      )}
    </Fragment>
  );
};

export default User;
