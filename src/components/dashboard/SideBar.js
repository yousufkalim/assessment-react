import React from "react";
import Logo from "../../assets/img/f.jpeg";
import { Link } from "react-router-dom";

const SideBar = ({ step, setStep }) => {
  return (
    <div class="sidebar">
      <div class="profile_info">
        <img src={Logo} style={{ width: "25%", margin: "10px" }} alt="" />
        <h4>Orientatr</h4>
      </div>
      <div className="options">
        <Link to="/dashboard">
          <i class="fas fa-desktop"></i>
          <span>Dashboard</span>
        </Link>
        <Link to="/users">
          <i class="fas fa-desktop option"></i>
          <span>All Users</span>
        </Link>
        <Link to="/results">
          <i class="fas fa-desktop option"></i>
          <span>All Results</span>
        </Link>
      </div>
    </div>
  );
};

export default SideBar;
