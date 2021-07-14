import React from "react";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchEvent } from "../../store/api/eventSlice";
import { selectUserId } from "../../store/api/authSlice";

const NewsList = ({ newsItems }) => {
  const dispatch = useDispatch();
  const userId = useSelector(selectUserId);

  const onClick = eventId => {
    dispatch(fetchEvent(eventId, userId));
  };

  return (
    <div>
      {newsItems.map(newsItem => (
        <div key={newsItem.eventId}>
          <NavLink to="/event" onClick={() => onClick(newsItem.eventId)}>
            <div>
              <img src={newsItem.eventPhotoTitle} alt="No photo(" />
            </div>
          </NavLink>
          <div>
            <NavLink to="/event" onClick={() => onClick(newsItem.eventId)}>
              <h2>{newsItem.eventTitle}</h2>
            </NavLink>
            <p>{newsItem.eventDate + " " + newsItem.eventTime + " " + newsItem.eventLocation}</p>
            <p>{newsItem.eventGenre}</p>
            <div>
              <p>{newsItem.eventDesciption}</p>
              <button>
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
