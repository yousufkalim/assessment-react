import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import AnchorLink from "react-anchor-link-smooth-scroll";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    boxShadow: "none",
    background: "rgb(18 16 23)",
    color: "white",
    fontFamily: "lato",
  },
  menuButton: {
    fontSize: "21px",
    fontWeight: "bold",
    opacity: "0.8",
    margin: "0 20px 0 12px",
    fontFamily: "lato",
  },
  title: {
    flexGrow: 0.06,
    textAlign: "center",
    fontSize: "16px",
    padding: "0px",
    fontFamily: "roman",
    opacity: ".7",
    fontFamily: "lato",
  },
}));

export default function Header() {
  const classes = useStyles();
  const [flag, setFlag] = useState(false);

  return (
    <AppBar color="black" position="sticky" className={classes.root}>
      <Toolbar>
        <IconButton
          edge="start"
          className={`${classes.menuButton} IconButton`}
          color="inherit"
          aria-label="menu"
        >
          Orientator
        </IconButton>

        <AnchorLink
          href="#top"
          style={{
            textDecoration: "none",
            color: "white",
            padding: "0 25px 0 0",
          }}
        >
          <Typography className={classes.title}>Accuiel</Typography>
        </AnchorLink>
        <AnchorLink
          href="#comment"
          style={{ textDecoration: "none", color: "white" }}
        >
          <Typography className={classes.title}>Comment ca marche ?</Typography>
        </AnchorLink>
      </Toolbar>
    </AppBar>
  );
}
