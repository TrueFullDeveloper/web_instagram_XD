import React from "react";

const EventAnnotation = ({ eventAnnotation }) => {
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
        <h1>{eventAnnotation.eventManager.eventManagerName}</h1>
        <img src={eventAnnotation.eventManager.eventManagerPhoto} alt="No photo(" />

        <div>
          <h2>Список участников мероприятия:</h2>
          {eventAnnotation.parcicipantList.map(parcicipantItem => (
            <div key={parcicipantItem.parcicipantId}>
              <h1>{parcicipantItem.parcicipantName}</h1>
              <div>
                <img src={parcicipantItem.parcicipantPhoto} alt="No photo(" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EventAnnotation;
