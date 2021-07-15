import React from "react";
import Loader from "../../components/loader";
import CreateEventForm from "../../components/createEventForm";
import Footer from "../../components/footer/Footer";
import { useSelector } from "react-redux";
import { selectCreateEventLoading } from "../../store/api/createEventSlice";

const CreateEventPage = ({ eventManagerId }) => {
  const loading = useSelector(selectCreateEventLoading);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <CreateEventForm eventManagerId={eventManagerId} />
          <Footer />
        </>
      )}
    </>
  );
};

export default CreateEventPage;
