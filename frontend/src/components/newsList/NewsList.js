import React from "react";
import { NavLink } from "react-router-dom";

export const NewsList = ({ newsItems }) => {
  const onClick = eventId => {
    console.log(`Event ID is ${eventId}`);
  };

  return (
    <div>
      {newsItems.map(newsItem => (
        <div key={newsItem.eventId}>
          <NavLink to="/" onClick={() => onClick(newsItem.eventId)}>
            <div>
              <img src={newsItem.eventPhotoTitle} alt="No photo(" />
            </div>
          </NavLink>
          <div>
            <NavLink to="/" onClick={() => onClick(newsItem.eventId)}>
              <h2>{newsItem.eventTitle}</h2>
            </NavLink>
            <p>{newsItem.eventDate + " " + newsItem.eventTime + " " + newsItem.eventLocation}</p>
            <p>{newsItem.eventGenre}</p>
            <div>
              <p>{newsItem.eventDesciption}</p>
              <button>
                <NavLink to="/" onClick={() => onClick(newsItem.eventId)}>
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
