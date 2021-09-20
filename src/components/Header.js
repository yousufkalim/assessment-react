import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import AnchorLink from "react-anchor-link-smooth-scroll";
import logo from "../assets/img/logo.png";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    boxShadow: "none",
    background: "rgb(18 16 23)",
    color: "white",
    fontFamily: "lato",
  },
}));

export default function Header() {
  const classes = useStyles();
  const [flag, setFlag] = useState(false);

  return (
    <AppBar color="black" position="sticky" className={classes.root}>
      <Toolbar color="" className="showToolbar">
        <div className="logowithicondiv">
          <div
            edge="start"
            className="navIconbox"
            color="inherit"
            aria-label="menu"
            onClick={() => setFlag(!flag)}
          >
            {flag ? "---" : "==="}
          </div>
          <img src={logo} width="90%" />
        </div>

        <AnchorLink
          href="#top"
          style={{
            textDecoration: "none",
            color: "white",
            padding: "0 25px 0 0",
          }}
        >
          <Typography className={flag ? "title" : "hidetitle"}>
            Accuiel
          </Typography>
        </AnchorLink>
        <AnchorLink
          href="#comment"
          style={{ textDecoration: "none", color: "white" }}
        >
          <Typography className={flag ? "title" : "hidetitle"}>
            Comment ca marche ?
          </Typography>
        </AnchorLink>
      </Toolbar>
    </AppBar>
  );
}
