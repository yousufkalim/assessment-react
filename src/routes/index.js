import React, { useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import Home from "../containers/Home.js";
import CheckResult from "../containers/CheckResult";
import AddCandidate from "../containers/AddCandidate";
import Login from "../containers/Login";
import CGU from "../containers/CGU";
import Admin from "./Admin";

const index = () => {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/checkresult" component={CheckResult} />
      <Route exact path="/addcandidate" component={AddCandidate} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/CGU" component={CGU} />
      <Route exact path="/*" render={() => <Admin />} />ß
    </Switch>
  );
};

export default index;
