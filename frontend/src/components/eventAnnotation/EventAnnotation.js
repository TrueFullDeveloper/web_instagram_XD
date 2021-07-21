import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser } from "../../store/api/userSlice";
import { addRepost } from "../../store/api/repostSlice";
import { selectUserId } from "../../store/api/authSlice";
import styles from "./EventAnnotation.module.scss";

const EventAnnotation = ({ eventAnnotation }) => {
  const dispatch = useDispatch();
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
        <h3>Направление мероприятия: {eventAnnotation.eventGenre}</h3>
        <p>{eventAnnotation.eventDesciption}</p>

        <h2>Организатор мероприятия:</h2>

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
              <p>Организатор</p>
            </div>
          </NavLink>
        </div>
        {isUserRepost ? (
          <button type="button" className={styles.reposted_button} disabled>
            Мероприятие доваленно
          </button>
        ) : (
          <button type="button" onClick={() => onClick(eventAnnotation.eventId)}>
            Репост
          </button>
        )}
      </div>
    </div>
  );
};

export default EventAnnotation;
