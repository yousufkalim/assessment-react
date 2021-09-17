import React from "react";
import Grid from "@material-ui/core/Grid";
import Main from "../assets/img/mainimg.png";
import VideoImage from "../assets/img/videoimg.png";
import footer1 from "../assets/img/1.png";

const Landing = ({ setStep }) => {
  return (
    <div className="main" id="top">
      <img src={Main} className="bodyimg" />
      <Grid container spacing={3} className="body-rectangle">
        <Grid item xs={12} sm={2} className="body-rectangleGrid1">
          <div className="grid1"></div>
        </Grid>
        <Grid item xs={12} sm={7} className="body-rectangleGrid2">
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
        </Grid>
      </Grid>
      <div id="comment" className="vidoSection">
        <h2 className="h2">Comment ca marche ?</h2>
      </div>
      <div style={{ margin: "10px" }}>
        <img src={VideoImage} style={{ width: "50%" }} />
      </div>
      <Grid container spacing={3} className="footerGrid">
        <Grid item xs={12} sm={4}>
          <img src={footer1} />
          <h4 className="h4">Etape 1</h4>
          <p className="p2">Dis a Orientator qui tu es</p>
        </Grid>
        <Grid item xs={12} sm={4}>
          <img src={footer1} />
          <h4 className="h4">Etape 2</h4>
          <p className="p2">Réponds aux questions d'Orientator.</p>
        </Grid>
        <Grid item xs={12} sm={4}>
          <img src={footer1} />
          <h4 className="h4">Etape 3</h4>
          <p className="p2">
            Orientator te propose une liste de voeux
            <br /> pour ton Parcoursup !
          </p>
        </Grid>
      </Grid>
    </div>
  );
};

export default Landing;
