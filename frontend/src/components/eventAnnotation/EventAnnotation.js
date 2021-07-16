import React from "react";
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { fetchUser } from "../../store/api/userSlice";
import { addRepost } from "../../store/api/repostSlice";

const EventAnnotation = ({ eventAnnotation }) => {
  const dispatch = useDispatch();

  return (
    <div>
      <img src={eventAnnotation.eventPhotoTitle} alt="No photo(" />

      <div>
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
        <h3>{eventAnnotation.eventGenre}</h3>
        <p>{eventAnnotation.eventDesciption}</p>
        <div>
          <h2>Организатор мероприятия:</h2>
          <NavLink
            to="/user"
            onClick={() => dispatch(fetchUser(eventAnnotation.eventManager.eventManagerId))}
          >
            <h1>{eventAnnotation.eventManager.eventManagerName}</h1>
            <img src={eventAnnotation.eventManager.eventManagerPhoto} alt="No photo(" />
          </NavLink>
        </div>

        <button onClick={dispatch(addRepost(eventAnnotation.eventId))}>Репост</button>
      </div>
    </div>
  );
};

export default EventAnnotation;
