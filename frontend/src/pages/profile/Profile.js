import React, { useEffect } from "react";
import ProfileInfomation from "../../components/profileInfomation";
import RepostList from "../../components/repostList";
import Loader from "../../components/loader";
import Footer from "../../components/footer/Footer";
import { useSelector, useDispatch } from "react-redux";
import { fetchProfile, selectProfileLoading, selectProfile } from "../../store/api/profileSlice";
import { selectUserId } from "../../store/api/authSlice";
import { fetchRepost, selectRepostList, selectRepostLoading } from "../../store/api/repostSlice";

const Profile = () => {
  const dispatch = useDispatch();

  const profieLoading = useSelector(selectProfileLoading);
  const repostlLoading = useSelector(selectRepostLoading);
  const profileData = useSelector(selectProfile);
  const userId = useSelector(selectUserId);
  const userRepostList = useSelector(selectRepostList);

  useEffect(() => {
    dispatch(fetchProfile(userId));
    dispatch(fetchRepost(userId));
    // eslint-disable-next-line
  }, []);

  return (
    <>
      {profieLoading || repostlLoading ? (
        <Loader />
      ) : (
        <>
          <ProfileInfomation profileData={profileData} />
          {userRepostList.lenght != 0 ? (
            <RepostList repostList={userRepostList} isOwener={true} />
          ) : null}
          <Footer />
        </>
      )}
    </>
  );
};

export default Profile;
