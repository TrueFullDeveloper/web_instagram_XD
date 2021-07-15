import React from "react";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchEvent } from "../../store/api/eventSlice";
import { selectUserId } from "../../store/api/authSlice";
import styles from "./NewsList.module.scss";

const NewsList = ({ newsItems }) => {
  const dispatch = useDispatch();
  const userId = useSelector(selectUserId);

  const onClick = eventId => {
    dispatch(fetchEvent(eventId, userId));
  };

  return (
    <div className={styles.news_section}>
      {newsItems.map(newsItem => (
        <div className={styles.news_item} key={newsItem.eventId}>
          <NavLink to="/event" onClick={() => onClick(newsItem.eventId)}>
            <div className={styles.top_section}>
              <div className={styles.filledbar_3}></div>
              <div className={styles.filledbar_2}></div>
              <img src={newsItem.eventPhotoTitle} alt="No photo(" />
              <div className={styles.filledbar_1}></div>
              <div className={styles.filledbar_4}></div>
            </div>
          </NavLink>

          <div className={styles.info_section}>
            <NavLink to="/event" onClick={() => onClick(newsItem.eventId)}>
              <h2>{newsItem.eventTitle}</h2>
            </NavLink>
            <p>{newsItem.eventDate + " " + newsItem.eventTime + " " + newsItem.eventLocation}</p>
            <p>Направление мероприятия: {newsItem.eventGenre}</p>
            <div>
              <p className={styles.event_description}>{newsItem.eventDesciption}</p>
              <button type="button">
                <NavLink to="/event" onClick={() => onClick(newsItem.eventId)}>
                  Подробнее
                </NavLink>
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default NewsList;
