import React from "react";
import api from "../../api";
const Header = () => {
  const logout = async () => {
    let res = await api("get", `admin/auth/logout`);
    if (res) {
      window.location = "/login";
    }
  };
  return (
    <div className="headera">
      <label for="check">
        <i className="fas fa-bars" id="sidebar_btn"></i>
      </label>
      <div className="left_area">
        <h3>
          Admin <span>panel</span>
        </h3>
      </div>
      <div className="right_area">
        <a href="#" className="logout_btn" onClick={() => logout()}>
          Logout
        </a>
      </div>
    </div>
  );
};

export default Header;
