import React, { Fragment, useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import { Loader } from "./components/loader/Loader";
import { Header } from "./components/header/Header";
import { useRoutes } from "./routes";
import { useSelector, useDispatch } from "react-redux";
import {
  selectAuthenticateStatus,
  selectAuthLoading,
  userLogin,
} from "./reduxToolkit/api/authSlice";

function App() {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(selectAuthenticateStatus);
  const loading = useSelector(selectAuthLoading);
  const routes = useRoutes(isAuthenticated);

  useEffect(() => {
    dispatch(userLogin());
  }, [dispatch]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <BrowserRouter>
          {isAuthenticated && <Header />} {routes}
        </BrowserRouter>
      )}
    </Fragment>
  );
}

export default App;
