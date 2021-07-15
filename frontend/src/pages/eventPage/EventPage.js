import React from "react";
import Loader from "../../components/loader";
import { useSelector } from "react-redux";
import {
  selectEventAnnotation,
  selectFeedbackList,
  selectEventLoading,
  selectUserFeedbackId,
} from "../../store/api/eventSlice";
import FeedbackList from "../../components/feedbackList";
import FeedbackForm from "../../components/feedbackForm";
import EventAnnotation from "../../components/eventAnnotation";
import Footer from "../../components/footer/Footer";

const EventPage = () => {
  const eventAnnotation = useSelector(selectEventAnnotation);
  const feedbackList = useSelector(selectFeedbackList);
  const loading = useSelector(selectEventLoading);
  const userFeedbackId = useSelector(selectUserFeedbackId);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <EventAnnotation eventAnnotation={eventAnnotation} />
          {!userFeedbackId && <FeedbackForm />}
          <FeedbackList feedbackList={feedbackList} userFeedbackId={userFeedbackId} />
          <Footer />
        </>
      )}
    </>
  );
};

export default EventPage;
