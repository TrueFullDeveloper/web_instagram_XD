import React, { Fragment } from "react";
import { BrowserRouter } from "react-router-dom";
import { Loader } from "./components/loader/Loader";
import { useRoutes } from "./routes";
import { Header } from "./components/header/Header";

function App() {
  const isAuthenticated = false;
  const loading = false;
  const routes = useRoutes(isAuthenticated);

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
