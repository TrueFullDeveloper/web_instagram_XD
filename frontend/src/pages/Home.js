import React, { Fragment, useEffect } from "react";
import { NewsList } from "../components/newsList/NewsList";
import { Loader } from "../components/loader/Loader";
import { useSelector, useDispatch } from "react-redux";
import { fetchNews, selectNewsList, selectNewsLoading } from "../reduxToolkit/api/newsSlice";

export const Home = () => {
  const dispatch = useDispatch();

  const newsItems = useSelector(selectNewsList);
  const loading = useSelector(selectNewsLoading);

  useEffect(() => {
    dispatch(fetchNews());
  }, []);

  return <Fragment>{loading ? <Loader /> : <NewsList newsItems={newsItems} />}</Fragment>;
};
