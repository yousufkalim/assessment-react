import React, { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import Main from "../assets/img/a.png";
import MainMobile from "../assets/img/mainmobile.png";
import VideoImage from "../assets/img/videoimg.png";
import scrollToTop from "../utils/ScrollTop";

import f1 from "../assets/img/f1.png";
import f2 from "../assets/img/f2.png";
import f3 from "../assets/img/f3.png";
import arrowright from "../assets/img/arrow.png";

const Landing = ({ step, setStep, statetextforscroll }) => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 115,
      behavior: "smooth",
    });
  };
  const scrollToTopforComment = () => {
    window.scrollTo({
      top: 850,
      behavior: "smooth",
    });
  };
  useEffect(() => {
    console.log("statetextforscroll", statetextforscroll);
    scrollToTop();
    statetextforscroll == "Accueil" && scrollToTop();
    statetextforscroll == "Comment" &&
      setTimeout(() => {
        scrollToTopforComment();
      }, 50);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [step]);
  return (
    <>
      <div className="main" id="top">
        <img src={Main} className="bodyimg forweb" />
        <img src={MainMobile} className="bodyimg formobile " />
        <Grid container spacing={2} className="body-rectangle">
          <Grid item xs={12} sm={9} className="body-rectangleGrid2">
            <h3 className="h3">Commençons le test d'orientation !</h3>
            <p className="p1">
              À la fin de ce questionnaire, une proposition de voeux pour
              Parcoursup te sera formulée !
            </p>
          </Grid>
          <Grid item xs={12} sm={3} className="body-rectangleGrid3">
            <button className="partiButton" onClick={() => setStep(1)}>
              C'est parti !
            </button>
            <img src={arrowright} className="arrowright" />
          </Grid>
        </Grid>
        <div id="comment" className="vidoSection">
          <h2 className="h2">Comment ça marche ?</h2>
        </div>
        <div style={{ margin: "10px" }}>
          <img src={VideoImage} className="videImage" />
        </div>
        <Grid container spacing={3} className="footerGrid">
          <Grid item xs={12} sm={4}>
            <img src={f1} className="footerimg" />
            <h4 className="h4">Étape 1</h4>
            <p className="p3">Dis a Orientator qui tu es</p>
          </Grid>
          <Grid item xs={12} sm={4}>
            <img src={f2} className="footerimg" />
            <h4 className="h4">Étape 2</h4>
            <p className="p3">Réponds aux questions d'Orientator.</p>
          </Grid>
          <Grid item xs={12} sm={4}>
            <img src={f3} className="footerimg" />
            <h4 className="h4">Étape 3</h4>
            <p className="p3">
              Orientator te propose une liste de voeux pour ton Parcoursup !
            </p>
          </Grid>
        </Grid>
      </div>
    </>
  );
};
export default Landing;
