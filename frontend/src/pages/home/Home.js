import React, { Fragment, useEffect } from "react";
import NewsList from "../../components/newsList";
import Loader from "../../components/loader";
import FilterForm from "../../components/filterForm";
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
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <FilterForm />
          <NewsList newsItems={newsItems} />
        </Fragment>
      )}
    </Fragment>
  );
};

export default Home;
