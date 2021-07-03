import { lazy } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import LoginPage from "./login";
import PasswordReset from "./passwordReset";
import Signup from "./signup";

// This Need for Maping Routes
const routesConfig = [
  {
    path: "/",
    component: lazy(() => import("./home")),
  },
  {
    path: "/event",
    component: lazy(() => import("./eventPage")),
  },
  {
    path: "/profile",
    component: lazy(() => import("./profile")),
  },
];

export const getRoutes = isAuthenticated => {
  if (isAuthenticated) {
    return (
      <Switch>
        {routesConfig.map(routeItem => (
          <Route path={routeItem.path} exact component={routeItem.component} />
        ))}
        <Redirect to="/" />
      </Switch>
    );
  }

  return (
    <Switch>
      <Route path={"/login"} exact component={LoginPage} />
      <Route path={"/signup"} exact component={Signup} />
      <Route path={"/passwordreset"} exact component={PasswordReset} />
      <Redirect to="/login" />
    </Switch>
  );
};
