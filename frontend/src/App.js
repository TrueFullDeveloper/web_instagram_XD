import React, { Suspense, useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import Loader from "./components/loader";
import Header from "./components/header";
import { getRoutes } from "./pages/routes";
import { useSelector, useDispatch } from "react-redux";
import { selectAuthenticateStatus, selectAuthLoading, tokenUpdate } from "./store/api/authSlice";

function App() {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(selectAuthenticateStatus);
  const loading = useSelector(selectAuthLoading);
  const routes = getRoutes(isAuthenticated);

  useEffect(() => {
    dispatch(tokenUpdate());
  }, [dispatch]);

  return loading ? (
    <Loader />
  ) : (
    <Suspense fallback={<Loader />}>
      <BrowserRouter>
        {isAuthenticated && <Header />} {routes}
      </BrowserRouter>
    </Suspense>
  );
}

export default App;
