import React, { useState, useEffect } from "react";
import Header from "../components/dashboard/Header";
import SideBar from "../components/dashboard/SideBar";

import Users from "../containers/Users";
import Results from "../containers/Results";
import Dashboard from "../containers/Dashboard";
import { Route, Switch } from "react-router-dom";
import "../css/admin.css";

const Admin = () => {
  return (
    <>
      <Header />
      <SideBar />
      <Switch>
        <Route exact path="/dashboard" component={Dashboard} />
        <Route exact path="/users" component={Users} />
        <Route exact path="/results" component={Results} />
      </Switch>
    </>
  );
};

export default Admin;
