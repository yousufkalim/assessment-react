import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Store, UpdateStore } from "../StoreContext";
import Dummy from "../assets/img/dummy.png";
import MainMobile from "../assets/img/mobileform.png";
import qarrow from "../assets/icons/qarrow.png";
import Grid from "@material-ui/core/Grid";
import Button from "@mui/material/Button";
import QuestionsTimer from "./QuestionsTimer";
import TimerDialog from "./TimerDialoge";

// const [key, setKey] = useState(0);

const Questions = ({ step, setStep, setActiveStep }) => {
  // init context
  const updateStore = UpdateStore();
  const { questions, answers, history, disc_ans_id, allanswer } = Store();
  // state init
  const [nextQuestionId, setNextQuestionId] = useState("first");
  const [nextQuestionNo, setNextQuestionNo] = useState(0);
  const [prevQuestion, setprevQuestion] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [duration, setDuration] = useState(10);

  const [allAns, setAllAns] = useState([]);
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
    setAllAns([ans, ...allAns]);
    setNextQuestionId(ans?.next_question);
    updateStore({ history: [...history, ans] });
    updateStore({ allanswer: [...allanswer, ans] });

    setprevQuestion([]);
    // setCurrentAnswer(null);
  };
  //
  // const getQuestion = () => {
  //   console.log("NEXTQUES  is ", nextQuestionId);
  //   if (nextQuestionId == null) {
  //     // console.log("n is in step 3 ", nextQuestionId);
  //     setStep(3);
  //     // setActiveStep((prevActiveStep) => prevActiveStep + 1);
  //     setActiveStep(3);
  //     return;
  //   }
  //   if (nextQuestionId === "first") {
  //     return questions?.find((questions) => questions.isFirst);
  //   } else {
  //     return questions?.find((questions) => questions._id === nextQuestionId);
  //   }
  // };
  const getQuestion = () => {
    console.log("All questions -------> ", questions);
    if (nextQuestionId == null) {
      // console.log("n is in step 3 ", nextQuestionId);
      setStep(3);
      // setActiveStep((prevActiveStep) => prevActiveStep + 1);
      setActiveStep(3);
      return questions;
    }

    if (nextQuestionNo === 0) {
      return questions[0];
    } else {
      return questions?.find(
        (questions) => questions.question_number === nextQuestionNo
      );
    }
  };
  console.log("Ans is", allAns);
  console.log("n is in step quest ", step);
  console.log("Store is", allanswer);
  // if show the questions by filteron the base of nextquestionId
  console.log("question is ------>", questions);
  // it show the options of question by filter answer on the base of question id
  // const getOptions = (answers) => {
  //   let options = answers?.filter((answer) => {ankk{{}}
  //     return answer.question === getQuestion()?._id;
  //   });
  //   return options;
  // };
  {
  }
  const getOptions = (answers) => {
    let options = answers?.filter((answer) => {
      return (
        answer.question === getQuestion()?.question_number &&
        answer.technology === getQuestion()?.technology
      );
    });
    return options;
  };

  return (
    <>
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
                {
                  getQuestion()?.question
                  //  getQuestion()?.question
                  // : "you reached the end of the quiz"
                }
              </h1>
            </div>
            <Grid container spacing={3} className="answerGrid">
              {answers &&
                getOptions(answers)?.map((ans) => (
                  <Grid
                    item
                    xs={12}
                    sm={5}
                    className="option"
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
        {/* <QuestionsTimer
          setStep={setStep}
          setActiveStep={setActiveStep}
          setOpen={setOpen}
          open={open}
          duration={duration}
          setDuration={setDuration}
        />
        <TimerDialog
          open={open}
          setOpen={setOpen}
          setStep={setStep}
          setActiveStep={setActiveStep}
          duration={duration}
          setDuration={setDuration}
        /> */}
      </Grid>
    </>
  );
};

export default Questions;
