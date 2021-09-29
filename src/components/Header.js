import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import AnchorLink from "react-anchor-link-smooth-scroll";
import logo from "../assets/img/logo.png";
import Navicon from "../assets/icons/navicon.png"
import Closeicon from "../assets/icons/closeicon.png"

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    boxShadow: "none",
    background:'radial-gradient(97.47% 66.83% at 50% 50%, #0e0f14 0%,   #000000 100%)',
    // background: "rgb(10 11 15)",
    color: "white",
    fontFamily: "lato",
  },
}));

export default function Header() {
  const classes = useStyles();
  const [flag, setFlag] = useState(false);
 // Show navbar when page is scorlled upto given distance

 const scrollToTop = () => {
  window.scrollTo({
    top: 115,
    behavior: "smooth",
  });
 };
 const deviceType = () => {
  const ua = navigator.userAgent;
  if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
      return "";
  }
  else if (/Mobile|Android|iP(hone|od)|IEMobile|BlackBerry|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(ua)) {
      return "";
  }
  return "sticky";
 };
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
            {flag ? <img src={Closeicon} className="navicon" /> : <img src={Navicon} className="navicon" />}
          </div>
          <img src={logo} width="90%" className="logoImage" onClick={()=>window.location.reload()}/>
        </div>
 
        <AnchorLink
          href={`${!flag?"#top":""}`}
          style={{
            textDecoration: "none",
            color: "white",
            padding: "15px 25px 0 0",
          }}
        >
          <Typography className={flag ? "title a" : "hidetitle a"} onClick={()=>{flag && scrollToTop()}}>
            Accueil
          </Typography>
        </AnchorLink>
        <AnchorLink
          href="#comment"
          style={{ textDecoration: "none", color: "white",paddingTop:"15px" }}
        >
          <Typography className={flag ? "title b" : "hidetitle b"}>
            Comment ça marche ?
          </Typography>
        </AnchorLink>
      </Toolbar>
    </AppBar>
  );
}
