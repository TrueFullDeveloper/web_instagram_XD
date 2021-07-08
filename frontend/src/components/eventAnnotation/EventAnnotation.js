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
        <h2>Организатор мероприятия:</h2>
        <NavLink
          to="/user"
          onClick={() => dispatch(fetchUser(eventAnnotation.eventManager.eventManagerId))}
        >
          <h1>{eventAnnotation.eventManager.eventManagerName}</h1>
          <img src={eventAnnotation.eventManager.eventManagerPhoto} alt="No photo(" />
        </NavLink>
        <div>
          <h2>Список участников мероприятия:</h2>
          {eventAnnotation.parcicipantList.map(parcicipantItem => (
            <NavLink to="/user" onClick={() => dispatch(fetchUser(parcicipantItem.parcicipantId))}>
              <div key={parcicipantItem.parcicipantId}>
                <h1>{parcicipantItem.parcicipantName}</h1>
                <div>
                  <img src={parcicipantItem.parcicipantPhoto} alt="No photo(" />
                </div>
              </div>
            </NavLink>
          ))}
        </div>
        {/* // TODO: May be Add Repost Validation */}
        <button onClick={dispatch(addRepost(eventAnnotation.eventId))}>Репост</button>
      </div>
    </div>
  );
};

export default EventAnnotation;
