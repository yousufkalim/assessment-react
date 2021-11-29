import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Store, UpdateStore } from "../StoreContext";
import scrollToTop from "../utils/ScrollTop";
import Dummy from "../assets/img/dummy.png";
import MainMobile from "../assets/img/mobileform.png";
import qarrow from "../assets/icons/qarrow.png";
import Grid from "@material-ui/core/Grid";
import Button from "@mui/material/Button";
import QuestionsTimer from "./QuestionsTimer";
import TimerDialog from "./TimerDialoge";
import NavigationBlocker from "./navBlocker";

// const MyComponent = () => {
//   const [shouldBlockNavigation, NshouldBlockNavigation] = React.useState(false);
//   <>
//     <Prompt
//       when={NshouldBlockNavigation}
//       message="You have unsaved changes, are you sure you want to leave?"
//     />
//     {/* Component JSX */}
//   </>;
// };

const Questions = ({ step, setStep, setActiveStep }) => {
  // init context
  const updateStore = UpdateStore();
  const { questions, answers, answerIds } = Store();
  // state init
  const [nextQuestionNo, setNextQuestionNo] = useState(0);
  const [lastQuestionIndex] = useState(questions.length - 1);

  const [open, setOpen] = React.useState(false);
  const [duration, setDuration] = useState(2400);

  useEffect(() => {
    scrollToTop();
  }, []);

  // styles
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

  // Getting all options according to the answer
  const getOptions = (answers) => {
    let options = answers?.filter((answer) => {
      return (
        answer.question === questions[nextQuestionNo].question_number &&
        answer.technology === questions[nextQuestionNo].technology
      );
    });

    let randomSort = options.sort(() => Math.random() - 0.5);

    randomSort.find((option, index) => {
      if (option.answer === "false") {
        randomSort.splice(index, 1);
        randomSort.splice(randomSort.length, 0, option);
      }

      if (option.answer === "All of these") {
        randomSort.splice(index, 1);
        randomSort.splice(randomSort.length, 0, option);
      }

      if (option.answer === "None of these") {
        randomSort.splice(index, 1);
        randomSort.splice(randomSort.length, 0, option);
      }
    });

    return randomSort;
  };

  // When user click on an option
  const handleSelectOption = async (ans) => {
    updateStore({ answerIds: [...answerIds, ans._id] });

    if (lastQuestionIndex !== nextQuestionNo) {
      setNextQuestionNo(nextQuestionNo + 1);
    } else {
      setStep(3);
      setActiveStep(3);
    }
  };

  return (
    <>
      <NavigationBlocker />;
      <Grid container spacing={2} className="mainquestionscreen">
        <Grid item xs={12} sm={4} className="">
          <img src={Dummy} className="dummyimgQuestion forweb" />
          <img src={MainMobile} className="dummyimgforQuestion formobile" />
        </Grid>
        <Grid item xs={12} sm={8} className="questionGrid">
          <p className="questionNum">
            {nextQuestionNo + 1}/{lastQuestionIndex + 1}
          </p>

          <div className="questionDiv">
            <div className="question-container">
              <img src={qarrow} className="qboximg" />
              <div className="questionBox">
                <h2
                  className="questiontext"
                  onCopy={(e) => {
                    e.preventDefault();
                    return false;
                  }}
                >
                  {questions[nextQuestionNo].question}
                </h2>
              </div>
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
                    onCopy={(e) => {
                      e.preventDefault();
                      return false;
                    }}
                  >
                    {ans?.answer}
                  </Grid>
                ))}
            </Grid>
          </div>
        </Grid>
        <QuestionsTimer
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
        />
      </Grid>
    </>
  );
};

export default Questions;
