import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser } from "../../store/api/userSlice";
import { addRepost } from "../../store/api/repostSlice";
import { selectUserId } from "../../store/api/authSlice";
import styles from "./EventAnnotation.module.scss";
//i18n
import { useTranslation } from "react-i18next";

const EventAnnotation = ({ eventAnnotation }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const userId = useSelector(selectUserId);

  // TODO: Add Repost Status to eventSlice
  const [isUserRepost, setUserRepost] = useState(false);
  const onClick = eventId => {
    setUserRepost(true);
    dispatch(addRepost(eventId, userId));
  };

  return (
    <div className={styles.event}>
      <img src={eventAnnotation.eventPhotoTitle} alt="No photo(" />

      <div className={styles.info_section}>
        <h1>{eventAnnotation.eventTitle}</h1>
        <p>
          {eventAnnotation.eventDate +
            " " +
            eventAnnotation.eventTime +
            " " +
            eventAnnotation.eventLocation +
            " " +
            eventAnnotation.eventRating}
        </p>
        <h3>
          {t("pages.eventPage.eventGenre")} {eventAnnotation.eventGenre}
        </h3>
        <p>{eventAnnotation.eventDesciption}</p>

        <h2>{t("pages.eventPage.eventManager")}</h2>

        <div className={styles.event_manager}>
          <NavLink
            to="/user"
            onClick={() => dispatch(fetchUser(eventAnnotation.eventManager.eventManagerId))}
          >
            <img src={eventAnnotation.eventManager.eventManagerPhoto} alt="No photo(" />
          </NavLink>

          <NavLink
            to="/user"
            onClick={() => dispatch(fetchUser(eventAnnotation.eventManager.eventManagerId))}
          >
            <div>
              <h2>{eventAnnotation.eventManager.eventManagerName}</h2>
              <p>{t("pages.eventPage.manager")}</p>
            </div>
          </NavLink>
        </div>
        {isUserRepost ? (
          <button type="button" className={styles.reposted_button} disabled>
            {t("pages.eventPage.eventAdded")}
          </button>
        ) : (
          <button type="button" onClick={() => onClick(eventAnnotation.eventId)}>
            {t("pages.eventPage.repost")}
          </button>
        )}
      </div>
    </div>
  );
};

export default EventAnnotation;
