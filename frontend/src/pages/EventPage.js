import React, { Fragment } from "react";
import { Loader } from "../components/loader/Loader";
import { useSelector } from "react-redux";
import {
  selectEventAnnotation,
  selectFeedbackList,
  selectEventLoading,
} from "../reduxToolkit/api/eventSlice";
import { EventAnnotation } from "../components/eventAnnotation/EventAnnotation";
import { FeedbackList } from "../components/feedbackList/FeedbackList";

export const EventPage = () => {
  const eventAnnotation = useSelector(selectEventAnnotation);
  const feedbackList = useSelector(selectFeedbackList);
  const loading = useSelector(selectEventLoading);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <EventAnnotation eventAnnotation={eventAnnotation} />
          <FeedbackList feedbackList={feedbackList} />
        </Fragment>
      )}
    </Fragment>
  );
};
