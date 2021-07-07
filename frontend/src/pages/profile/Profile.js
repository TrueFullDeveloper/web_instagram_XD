import React, { Fragment, useEffect } from "react";
import ProfileInfomation from "../../components/profileInfomation";
import RepostList from "../../components/repostList";
import Loader from "../../components/loader";
import { useSelector, useDispatch } from "react-redux";
import { fetchProfile, selectProfileLoading, selectProfile } from "../../store/api/profileSlice";
import { selectUserId } from "../../store/api/authSlice";

const Profile = () => {
  const loading = useSelector(selectProfileLoading);
  const profileData = useSelector(selectProfile);
  const userId = useSelector(selectUserId);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProfile(userId));
    // eslint-disable-next-line
  }, []);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <ProfileInfomation profileData={profileData} />

          {/* Looks like shity code */}
          {profileData.userRepostList.lenght != 0 ? (
            <RepostList repostList={profileData.userRepostList} />
          ) : null}
        </Fragment>
      )}
    </Fragment>
  );
};

export default Profile;
