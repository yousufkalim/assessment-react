import React from "react";
import { Redirect } from "react-router-dom";
import { Store, UpdateStore } from "../../StoreContext";
import api from "../../api";

const Header = () => {
  const updateStore = UpdateStore();
  const { login } = Store();
  const logout = async () => {
    let res = await api("get", `/auth/logout`);
    if (res) {
      window.location = "/login";
    }
  };
  return (
    <div className="headera">
      <label for="check">
        <i class="fas fa-bars" id="sidebar_btn"></i>
      </label>
      <div class="left_area">
        <h3>
          Admin <span>panel</span>
        </h3>
      </div>
      <div class="right_area">
        <a href="#" class="logout_btn" onClick={() => logout()}>
          Logout
        </a>
      </div>
    </div>
  );
};

export default Header;
