import React, { Fragment } from "react";
import Loader from "../../components/loader";
import { useSelector } from "react-redux";
import {
  selectEventAnnotation,
  selectFeedbackList,
  selectEventLoading,
} from "../../store/api/eventSlice";
import FeedbackList from "../../components/feedbackList";
import FeedbackForm from "../../components/feedbackForm";
import EventAnnotation from "../../components/eventAnnotation";

const EventPage = () => {
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
          <FeedbackForm />
          <FeedbackList feedbackList={feedbackList} />
        </Fragment>
      )}
    </Fragment>
  );
};

export default EventPage;
