import React from "react";
import { NavLink } from "react-router-dom";
import { fetchUser } from "../../store/api/userSlice";
import { useDispatch } from "react-redux";

const FeedbackList = ({ feedbackList }) => {
  const dispatch = useDispatch();

  return (
    <div>
      <h1>Отзывы о мероприятии:</h1>
      {feedbackList.map(feedbackItem => (
        <div key={feedbackItem.feedbackId}>
          <NavLink to="/user" onClick={() => dispatch(fetchUser(feedbackItem.authorId))}>
            <h1>{feedbackItem.authorName + " " + feedbackItem.authorRating}</h1>
            <div>
              <img src={feedbackItem.authorPhoto} alt="No photo(" />
            </div>
          </NavLink>
          <p>{feedbackItem.feedback}</p>
        </div>
      ))}
    </div>
  );
};

export default FeedbackList;
