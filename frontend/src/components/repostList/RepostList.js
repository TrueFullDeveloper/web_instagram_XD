import React from "react";
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { fetchEvent } from "../../store/api/eventSlice";

const RepostList = ({ repostList }) => {
  const dispatch = useDispatch();

  return (
    <div>
      {repostList.map(repostItem => (
        <div key={repostItem.eventId}>
          <NavLink to="/event" onClick={() => dispatch(fetchEvent(repostItem.eventId))}>
            <div>
              <img src={repostItem.eventPhotoTitle} alt="No photo(" />
            </div>
          </NavLink>
          <div>
            <NavLink to="/event" onClick={() => dispatch(fetchEvent(repostItem.eventId))}>
              <h2>{repostItem.eventTitle}</h2>
            </NavLink>
            <p>
              {repostItem.eventDate + " " + repostItem.eventTime + " " + repostItem.eventLocation}
            </p>
            <p>{repostItem.eventGenre}</p>
            <div>
              <p>{repostItem.eventDesciption}</p>
              <button>
                <NavLink to="/event" onClick={() => dispatch(fetchEvent(repostItem.eventId))}>
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

export default RepostList;
