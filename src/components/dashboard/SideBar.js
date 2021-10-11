import React from "react";
import Logo from "../../assets/img/f.jpeg";
import { Link } from "react-router-dom";

const SideBar = () => {
  return (
    <div class="sidebar">
      <div class="profile_info">
        <img src={Logo} style={{ width: "25%", margin: "10px" }} alt="" />
        <h4>Orientator</h4>
      </div>
      <div className="options">
        <Link to="/users">
          {/* <i class="fas fa-desktop option"></i> */}
          <span style={{ marginRight: "35px" }}>All Users</span>
        </Link>
        <Link to="/results">
          {/* <i class="fas fa-desktop option "></i> */}
          <span style={{ marginRight: "35px" }}>All Results</span>
        </Link>
      </div>
    </div>
  );
};

export default SideBar;
