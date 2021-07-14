import React from "react";
import { NavLink } from "react-router-dom";
import { fetchUser } from "../../store/api/userSlice";
import { useDispatch } from "react-redux";
import { fetchProfile } from "../../store/api/profileSlice";
import { removeFeedback } from "../../store/api/eventSlice";

const FeedbackList = ({ feedbackList, userFeedbackId }) => {
  const dispatch = useDispatch();

  return (
    <div>
      <h1>Отзывы о мероприятии:</h1>
      {feedbackList.map(feedbackItem => (
        <div key={feedbackItem.feedbackId}>
          {userFeedbackId === feedbackItem.feedbackId ? (
            <>
              <NavLink to="/profile" onClick={() => dispatch(fetchProfile(feedbackItem.authorId))}>
                <h1>{feedbackItem.authorName + " " + feedbackItem.authorRating}</h1>
                <div>
                  <img src={feedbackItem.authorPhoto} alt="No photo(" />
                </div>
              </NavLink>
              <p>{feedbackItem.feedback}</p>
              <button
                type="button"
                onClick={() => dispatch(removeFeedback(4, feedbackItem.feedbackId))}
              >
                Удалить отзыв
              </button>
            </>
          ) : (
            <>
              <NavLink to="/user" onClick={() => dispatch(fetchUser(feedbackItem.authorId))}>
                <h1>{feedbackItem.authorName + " " + feedbackItem.authorRating}</h1>
                <div>
                  <img src={feedbackItem.authorPhoto} alt="No photo(" />
                </div>
              </NavLink>
              <p>{feedbackItem.feedback}</p>
            </>
          )}
        </div>
      ))}
    </div>
  );
};

export default FeedbackList;
