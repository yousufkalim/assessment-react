import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import AnchorLink from "react-anchor-link-smooth-scroll";
import logo from "../assets/img/logo.png";
import Navicon from "../assets/icons/navicon.png"
import Closeicon from "../assets/icons/closeicon.png"

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    boxShadow: "none",
    background: "rgb(18 16 23)",
    color: "white",
    fontFamily: "lato",
  },
}));
const scrollToTop = () => {
  window.scrollTo({
    top: 115,
    behavior: "smooth",
  });
};

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
            {flag ? <img src={Closeicon} /> : <img src={Navicon} />}
          </div>
          <img src={logo} width="90%" className="logoImage" onClick={()=>window.location.reload()}/>
        </div>
 
        <AnchorLink
          href={`${!flag?"#top":""}`}
          style={{
            textDecoration: "none",
            color: "white",
            padding: "0 25px 0 0",
          }}
        >
          <Typography className={flag ? "title a" : "hidetitle a"} onClick={()=>{flag && scrollToTop()}}>
            Accueil
          </Typography>
        </AnchorLink>
        <AnchorLink
          href="#comment"
          style={{ textDecoration: "none", color: "white" }}
        >
          <Typography className={flag ? "title b" : "hidetitle b"}>
            Comment ça marche ?
          </Typography>
        </AnchorLink>
      </Toolbar>
    </AppBar>
  );
}
