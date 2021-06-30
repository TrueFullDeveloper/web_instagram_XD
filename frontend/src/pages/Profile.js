import React, { Fragment, useEffect } from "react";
import { ProfileInfomation } from "../components/profileInfomation/ProfileInfomation";
import { Loader } from "../components/loader/Loader";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchProfile,
  selectProfileLoading,
  selectProfile,
} from "../reduxToolkit/api/profileSlice";
import { selectUserId } from "../reduxToolkit/api/authSlice";

export const Profile = () => {
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
        </Fragment>
      )}
    </Fragment>
  );
};
