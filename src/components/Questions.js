import React, { useState } from "react";
import { Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Radio from "@material-ui/core/Radio";
import api from "../api";
import { Store } from "../StoreContext";

const Questions = ({ setStep }) => {
  const { questions, answers } = Store();

  const [qIs, setQis] = useState(0);
  const useStyles = makeStyles((theme) => ({
    root: {
      "& > *": {
        margin: theme.spacing(1),
        width: "35ch",
      },
    },
    main: {
      width: "50%",
      margin: "auto",
      textAlign: "center",
      marginTop: "5%",
    },
    chekbox: {
      margin: "auto",
    },
    option: {
      fontFamily: "sans-serif",
      color: "gray",
      width: "50%",
      margin: "auto",
      marginBottom: "25px",
      padding: "15px",
      border: "2px solid gray",
      borderRadius: "15px",
      "&:hover": {
        background: "#eae7e7",
        cursor: "pointer",
      },
    },
  }));

  const classes = useStyles();

  return (
    <div className={classes.main}>
      <h1>{questions[qIs].question}</h1>
      <div>
        <div className={classes.option}>Option1</div>
        <div className={classes.option}>Option2</div>
        <div className={classes.option}>Option3</div>
      </div>
      <Button
        variant="contained"
        color="primary"
        size="large"
        onClick={() => {
          setQis(qIs + 1);
          if (qIs === 2) {
            setStep(3);
          }
        }}
      >
        {qIs === 2 ? "Submit" : `Question__${qIs + 1}`}
      </Button>
    </div>
  );
};

export default Questions;
