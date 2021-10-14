import React from "react";
import Grid from "@material-ui/core/Grid";
import { Link } from "react-router-dom";
import AnchorLink from "react-anchor-link-smooth-scroll";

const Footer = () => {
  return (
    <>
      <div className="FooterDiv">
        <div className="cguBar">
          <h3 style={{ textAlign: "center" }}>
            <AnchorLink
              href="#top"
              style={{
                color: "white",
              }}
            >
              Accueil
            </AnchorLink>
          </h3>
          <p style={{ textAlign: "center" }}>
            Developed By
            <a
              href="https:www.falconconsulting.fr"
              target="_blank"
              style={{ textDecoration: "none", color: " gray", margin: "5px" }}
            >
              {" "}
              Falcon IT Consulting
            </a>{" "}
            2021. All Rights Reserved
          </p>
          <h3 style={{ textAlign: "center" }}>
            <Link to="/CGU" style={{ color: "white" }}>
              CGU
            </Link>
          </h3>
        </div>
      </div>
    </>
  );
};

export default Footer;
