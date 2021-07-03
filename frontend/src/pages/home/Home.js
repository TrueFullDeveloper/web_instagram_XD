import React, { Fragment, useEffect } from "react";
import NewsList from "../../components/newsList";
import Loader from "../../components/loader";
import { useSelector, useDispatch } from "react-redux";
import { fetchNews, selectNewsList, selectNewsLoading } from "../../store/api/newsSlice";

const Home = () => {
  const dispatch = useDispatch();

  const newsItems = useSelector(selectNewsList);
  const loading = useSelector(selectNewsLoading);

  useEffect(() => {
    dispatch(fetchNews());
  }, []);

  return <Fragment>{loading ? <Loader /> : <NewsList newsItems={newsItems} />}</Fragment>;
};

export default Home;
