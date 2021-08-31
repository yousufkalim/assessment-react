import React, { useEffect } from "react";
import Header from "../components/dashboard/Header";
import SideBar from "../components/dashboard/SideBar";
import Users from "../containers/Users";
import Results from "../containers/Results";
import SingleUserResult from "../containers/SingleUserResult";
import Result from "../containers/Result";
import { Route, Switch } from "react-router-dom";
import { Store, UpdateStore } from "../StoreContext";
import Login from "../containers/Login";
import "../css/admin.css";
import api from "../api";

const Admin = () => {
  const updateStore = UpdateStore();
  const { authorization } = Store();
  useEffect(() => {
    console.log("useeffect");
    checkAuth();
  }, []);
  let checkAuth = async () => {
    let res = await api("get", `admin/auth/check-auth`);
    if (res.status === 200) {
      updateStore({ authorization: true });
    } else {
      localStorage.removeItem("token");
      updateStore({ authorization: null });
    }
  };

  return (
    <>
      {localStorage.token ? (
        <>
          <Header />
          <SideBar />
          <Switch>
            <Route exact path="/users/:id" component={SingleUserResult} />
            <Route exact path="/singleresult/:id" component={Result} />
            <Route exact path="/users" component={Users} />
            <Route exact path="/results" component={Results} />
          </Switch>
        </>
      ) : (
        <>{(window.location = "/login")}</>
      )}
    </>
  );
};

export default Admin;
