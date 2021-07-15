import React, { useEffect } from "react";
import NewsList from "../../components/newsList";
import Loader from "../../components/loader";
import FilterForm from "../../components/filterForm";
import Footer from "../../components/footer";
import { useSelector, useDispatch } from "react-redux";
import { fetchNews, selectNewsList, selectNewsLoading } from "../../store/api/newsSlice";

const Home = () => {
  const dispatch = useDispatch();

  const newsItems = useSelector(selectNewsList);
  const loading = useSelector(selectNewsLoading);

  useEffect(() => {
    dispatch(fetchNews());
  }, []);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <FilterForm />
          <NewsList newsItems={newsItems} />
          <Footer />
        </>
      )}
    </>
  );
};

export default Home;
