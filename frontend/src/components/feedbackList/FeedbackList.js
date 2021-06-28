import React from "react";

export const FeedbackList = ({ feedbackList }) => {
  return (
    <div>
      <h1>Отзывы о мероприятии:</h1>
      {feedbackList.map(feedbackItem => (
        <div key={feedbackItem.feedbackId}>
          <h1>{feedbackItem.authorName + " " + feedbackItem.authorRating}</h1>
          <div>
            <img src={feedbackItem.authorPhoto} alt="No photo(" />
          </div>
          <p>{feedbackItem.feedback}</p>
        </div>
      ))}
    </div>
  );
};
