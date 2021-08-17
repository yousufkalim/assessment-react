import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "../containers/Home.js";
import Login from "../containers/Login";
import Admin from "./Admin";
import { Store } from "../StoreContext";

const index = () => {
  const { login } = Store();
  console.log("logn", login);
  return (
    <Switch>
      <Route exact path="/" component={Home} />

      <Route exact path="/login" component={Login} />
      <Route exact path="/*" render={Admin} />
    </Switch>
  );
};

export default index;
