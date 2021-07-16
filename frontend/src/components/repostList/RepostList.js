import React from "react";
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { fetchEvent } from "../../store/api/eventSlice";
import { deleteRepost } from "../../store/api/repostSlice";
import styles from "./RepostList.module.scss";

const RepostList = ({ repostList, isOwener }) => {
  const dispatch = useDispatch();

  return (
    <div className={styles.repost_section}>
      <h1>Собираюсь пойти:</h1>

      {repostList.map(repostItem => (
        <div className={styles.repost_item} key={repostItem.eventId}>
          <NavLink to="/event" onClick={() => dispatch(fetchEvent(repostItem.eventId))}>
            <div className={styles.top_section}>
              <div className={styles.filledbar_3}></div>
              <div className={styles.filledbar_2}></div>
              <img src={repostItem.eventPhotoTitle} alt="No photo(" />
              <div className={styles.filledbar_1}></div>
              <div className={styles.filledbar_4}></div>
            </div>
          </NavLink>

          <div className={styles.info_section}>
            <NavLink to="/event" onClick={() => dispatch(fetchEvent(repostItem.eventId))}>
              <h2>{repostItem.eventTitle}</h2>
            </NavLink>
            <p>
              {repostItem.eventDate + " " + repostItem.eventTime + " " + repostItem.eventLocation}
            </p>
            <p>{repostItem.eventGenre}</p>
            <div>
              <p className={styles.event_description}>{repostItem.eventDesciption}</p>
              <button>
                <NavLink to="/event" onClick={() => dispatch(fetchEvent(repostItem.eventId))}>
                  Подробнее
                </NavLink>
              </button>
              {isOwener ? (
                <button
                  className={styles.delete_button}
                  type="button"
                  onClick={() => dispatch(deleteRepost(repostItem.repostId))}
                >
                  Удалить
                </button>
              ) : null}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RepostList;
