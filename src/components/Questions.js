import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Store, UpdateStore } from "../StoreContext";
import Dummy from "../assets/img/dummy.png";
import MainMobile from "../assets/img/mobileform.png";
import qarrow from "../assets/icons/qarrow.png";

import Grid from "@material-ui/core/Grid";
import Button from '@mui/material/Button';
import Question from "./data/Question";
import Ans from "./data/Ans";

const Questions = ({ setStep, setActiveStep }) => {
  // init context
  const updateStore = UpdateStore();
  const { questions, answers, history, disc_ans_id, allanswer } = Store();
  // state init
  const [nextQuestionId, setNextQuestionId] = useState("first");
  const [prevQuestion, setprevQuestion] = useState([]);
  const [allAns,setAllAns]=useState([]);
  const [currentAnswer, setCurrentAnswer] = useState();

  useEffect(() => {
    currentans();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },);
  // stlyes
  const useStyles = makeStyles((theme) => ({
    root: {
      "& > *": {
        margin: theme.spacing(1),
        width: "35ch",
      },
    },
    main: {
      margin: "auto",
      textAlign: "center",
      marginTop: "5%",
      height: "70vh",
    },
    chekbox: {
      margin: "auto",
    },
  }));
  const classes = useStyles();
  // when  select any option it will set next Q id ,update history , if Q type is discriminating update disc_ans_id
  const handleSelectOption = (ans) => {
    if (ans?.question?.questionType === "discriminating") {
      updateStore({ disc_ans_id: [...disc_ans_id, ans?._id] });
    }
    setAllAns([ans, ...allAns])
    setNextQuestionId(ans?.next_question);
    updateStore({ history: [...history, ans] });
    updateStore({ allanswer: [...allanswer, ans] });

    setprevQuestion([]);
    setCurrentAnswer(null);
  };
  console.log("Ans is", allAns);
  console.log("Store is", allanswer);


  // when Click on Previous Button it get previous question
  // by match nextquestion from history saved with current question and remove from history
  // if Q is discriminating it pop from disc_ans_id
  // it set next question id that is basically previous one which will show
  // create previous q array to get seleceted
  const handlePrev = () => {
    const getprev = history?.find(
      (his) => his?.next_question === getQuestion()?._id
    );
    if (getprev) {
      if (getprev?.Question?.questionType === "discriminating") {
        const disans = [...disc_ans_id];
        disans.pop();
        updateStore({
          disc_ans_id: disans,
        });
      }
      updateStore({
        history: history.slice(0, history.length - 1),
      });
      setNextQuestionId(getprev?.Question?._id);
      setprevQuestion([...prevQuestion, getprev]);
    }
  };
  //it set the current answer which will be selected
  const currentans = () => {
    let currentans = prevQuestion?.find(
      (answer) => answer.Ans === getQuestion()?._id
    );
    if (currentans !== undefined) {
      setCurrentAnswer(currentans);
    }
  };
  // if show the questions by filteron the base of nextquestionId
  const getQuestion = () => {
    if (nextQuestionId == null) {
      setStep(3);
      // setActiveStep((prevActiveStep) => prevActiveStep + 1);
      setActiveStep(3);
      return;
    }
    if (nextQuestionId === "first") {
      return Question?.find((Question) => Question.isFirst);
    } else {
      return Question?.find((Question) => Question._id === nextQuestionId);
    }
  };
  // it show the options of question by filter answer on the base of question id
  const getOptions = (answers) => {
    let options = answers?.filter((answer) => {
      return answer.question === getQuestion()?._id;
    });
    return options;
  };

  return (
    <Grid container spacing={2} className="mainquestionscreen">
      <Grid item xs={12} sm={4} className="">
        <img src={Dummy} className="dummyimgQuestion forweb" />
        <img src={MainMobile} className="dummyimgforQuestion formobile" />
      </Grid>
      <Grid item xs={12} sm={8} className="questionGrid">
        <div className="questionDiv">
          <img src={qarrow} className="qboximg" />
          <div className="questionBox">
            <h1 className="questiontext">
              {getQuestion()?.question
                ? getQuestion()?.question
                : "There's no Question please try again"}
              {console.log("saad",Question)}
            </h1>
          </div>
          <Grid container spacing={3} className="answerGrid">
            {Ans &&
              getOptions(Ans)?.map((ans) => (
                <Grid
                  item
                  xs={12}
                  sm={5}
                  className={
                    currentAnswer?.answer === ans?.answer
                      ? "selectedOption"
                      : "option"
                  }
                  onClick={() => handleSelectOption(ans)}
                >
                  {ans?.answer}
                </Grid>
              ))}
          </Grid>
          {/* {history.length >= 1 && (
            <Button
              variant="contained"
              color="primary"
              size="large"
              onClick={handlePrev}
            >
              {"Previous"}
            </Button>
          )} */}
        </div>
      </Grid>
    </Grid>
  );
};

export default Questions;
