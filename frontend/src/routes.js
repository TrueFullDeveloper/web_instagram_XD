import { Route, Switch, Redirect } from "react-router-dom";
import { EventPage } from "./pages/EventPage";
import { Home } from "./pages/Home";
import { Login } from "./pages/login/Login";
import { PasswordReset } from "./pages/passwordReset/PasswordReset";
import { Profile } from "./pages/Profile";
import { Signup } from "./pages/signup/Signup";

export const useRoutes = isAuthenticated => {
  if (isAuthenticated) {
    return (
      <Switch>
        <Route path={"/"} exact component={Home} />
        <Route path={"/event"} exact component={EventPage} />
        <Route path={"/profile"} exact component={Profile} />
        <Redirect to="/" />
      </Switch>
    );
  }

  return (
    <Switch>
      <Route path={"/login"} exact component={Login} />
      <Route path={"/signup"} exact component={Signup} />
      <Route path={"/passwordreset"} exact component={PasswordReset} />
      <Redirect to="/login" />
    </Switch>
  );
};
