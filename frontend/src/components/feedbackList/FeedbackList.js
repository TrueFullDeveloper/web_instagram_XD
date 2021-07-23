import React from "react";
import { NavLink } from "react-router-dom";
import { fetchUser } from "../../store/api/userSlice";
import { useDispatch } from "react-redux";
import { fetchProfile } from "../../store/api/profileSlice";
import { removeFeedback } from "../../store/api/eventSlice";
import styles from "./FeedbackList.module.scss";
//i18n
import { useTranslation } from "react-i18next";

const FeedbackList = ({ feedbackList, userFeedbackId }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const onClick = (isAuthor, userId) => {
    if (isAuthor) {
      dispatch(fetchProfile(userId));
    } else {
      dispatch(fetchUser(userId));
    }
  };

  return (
    <div className={styles.feedback_section}>
      <h1>{t("pages.eventPage.eventFeedbacks")}</h1>

      {feedbackList.map(feedbackItem => (
        <div className={styles.feedback_box} key={feedbackItem.feedbackId}>
          <div className={styles.top_section}>
            <div className={styles.profile}>
              <NavLink
                to={userFeedbackId === feedbackItem.feedbackId ? "/profile" : "/user"}
                onClick={() =>
                  onClick(userFeedbackId === feedbackItem.feedbackId, feedbackItem.authorId)
                }
              >
                <img src={feedbackItem.authorPhoto} alt="No photo(" />
              </NavLink>

              <NavLink
                to={userFeedbackId === feedbackItem.feedbackId ? "/profile" : "/user"}
                onClick={() =>
                  onClick(userFeedbackId === feedbackItem.feedbackId, feedbackItem.authorId)
                }
              >
                <div>
                  <h2>{feedbackItem.authorName}</h2>
                  <span>{feedbackItem.createdAt}</span>
                </div>
              </NavLink>
            </div>

            <div className={styles.reviews}>
              <i className="ion-star"></i>
              <i className={`ion-star ${feedbackItem.authorRating < 2 && styles.empty_star}`}></i>
              <i className={`ion-star ${feedbackItem.authorRating < 3 && styles.empty_star}`}></i>
              <i className={`ion-star ${feedbackItem.authorRating < 4 && styles.empty_star}`}></i>
              <i className={`ion-star ${feedbackItem.authorRating < 5 && styles.empty_star}`}></i>
            </div>
          </div>
          <hr />

          <div className={styles.feedback_text}>
            <p>
              {feedbackItem.feedback} Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Exercitationem, quaerat quis? Provident temporibus architecto asperiores nobis maiores
              nisi a. Quae doloribus ipsum aliquam tenetur voluptates incidunt blanditiis sed atque
              cumque.
            </p>
            {userFeedbackId === feedbackItem.feedbackId ? (
              <button
                type="button"
                onClick={() => dispatch(removeFeedback(4, feedbackItem.feedbackId))}
              >
                {t("pages.eventPage.deleteFeedback")}
              </button>
            ) : null}
          </div>
        </div>
      ))}
    </div>
  );
};

export default FeedbackList;
