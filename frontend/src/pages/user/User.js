import React, { Fragment, useEffect } from "react";
import UserInformation from "../../components/userInformation";
import RepostList from "../../components/repostList";
import Loader from "../../components/loader";
import { useSelector, useDispatch } from "react-redux";
import { selectUserLoading, selectUser } from "../../store/api/userSlice";
import { fetchRepost, selectRepostList, selectRepostLoading } from "../../store/api/repostSlice";

const User = () => {
  const dispatch = useDispatch();

  const userLoading = useSelector(selectUserLoading);
  const repostlLoading = useSelector(selectRepostLoading);
  const userData = useSelector(selectUser);
  const userRepostList = useSelector(selectRepostList);

  useEffect(() => {
    dispatch(fetchRepost(userData.userId));
  }, []);

  return (
    <Fragment>
      {userLoading || repostlLoading ? (
        <Loader />
      ) : (
        <Fragment>
          <UserInformation userData={userData} />

          {/* Looks like shity code */}
          {userRepostList.lenght != 0 ? (
            <RepostList repostList={userRepostList} isOwener={false} />
          ) : null}
        </Fragment>
      )}
    </Fragment>
  );
};

export default User;
