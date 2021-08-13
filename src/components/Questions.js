import React, { useState, useEffect } from "react";
import { Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Radio from "@material-ui/core/Radio";
import api from "../api";
import { Store, UpdateStore } from "../StoreContext";

const Questions = ({ setStep }) => {
  // init context
  const updateStore = UpdateStore();
  const { questions, answers, history, user, disc_ans_id } = Store();
  // state init
  const [nextQuestionId, setNextQuestionId] = useState("first");
  const [prevQuestion, setprevQuestion] = useState([]);
  const [currentAnswer, setCurrentAnswer] = useState(null);

  useEffect(() => {
    currentans();
  }, [prevQuestion]);
  // stlyes
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
    selectedOption: {
      fontFamily: "sans-serif",
      color: "gray",
      width: "50%",
      margin: "auto",
      marginBottom: "25px",
      padding: "15px",
      border: "2px solid gray",
      background: "#7d787c",
      color: "white",
      borderRadius: "15px",
      "&:hover": {
        background: "#eae7e7",
        cursor: "pointer",
      },
    },
  }));
  const classes = useStyles();
  // when  select any option it will set next Q id ,update history , if Q type is discriminating update disc_ans_id
  const handleSelectOption = (ans) => {
    if (ans?.question?.questionType === "discriminating") {
      updateStore({ disc_ans_id: [...disc_ans_id, ans?._id] });
    }
    setNextQuestionId(ans?.next_question);
    updateStore({ history: [...history, ans] });
    setprevQuestion([]);
    setCurrentAnswer(null);
    console.log("selected answer is", ans);
  };

  // when Click on Previou Button it get previous question
  // by match nextquestion from history saved with current question and remove from history
  // if Q is discriminating it pop from disc_ans_id
  // it set next question id that is basically previous one which will show
  // create previous q array to get seleceted
  const handlePrev = () => {
    console.log("prev is ");
    const getprev = history?.find(
      (his) => his?.next_question === getQuestion()?._id
    );
    console.log("history", history);

    console.log("get q is", getQuestion()?._id);

    console.log("prev is ", getprev);
    if (getprev) {
      if (getprev?.question?.questionType === "discriminating") {
        const disans = [...disc_ans_id];
        disans.pop();
        updateStore({
          disc_ans_id: disans,
        });
      }
      updateStore({
        history: history.slice(0, history.length - 1),
      });
      console.log("prev is ", getprev);
      setNextQuestionId(getprev?.question?._id);
      setprevQuestion([...prevQuestion, getprev]);
    }
  };
  //it set the current answer which will be selected
  const currentans = () => {
    let currentans = prevQuestion?.find(
      (q) => q.question?._id === getQuestion()?._id
    );
    console.log("current si s", currentans);
    if (currentans !== undefined) {
      console.log("lklk");
      setCurrentAnswer(currentans);
    }
  };
  // if show the questions by filteron the base of nextquestionId
  const getQuestion = () => {
    if (nextQuestionId == null) {
      let lastAnswerId = history.find((his) => his.next_question === null);
      // console.log(" disc_ans_id", disc_ans_id);
      // console.log("lastAnswerId", lastAnswerId?._id);
      // console.log("userid", user?._id);
      setStep(3);
      return;
    }
    if (nextQuestionId === "first") {
      return questions?.find((question) => question.isFirst);
    } else {
      return questions?.find((question) => question._id === nextQuestionId);
    }
  };
  // it show the options of question by filter answer on the base of question id
  const getOptions = (answers) => {
    let options = answers?.filter((answer) => {
      return answer.question._id === getQuestion()?._id;
    });
    return options;
  };

  console.log("prevQuestion", prevQuestion);
  console.log(
    "currentAnswer",
    currentAnswer?.answer ? currentAnswer?.answer : null
  );

  // console.log("history", history);

  return (
    <div className={classes.main}>
      <h1>{getQuestion()?.question ? getQuestion()?.question : "ended"}</h1>
      {answers &&
        getOptions(answers)?.map((ans) => (
          <div
            className={
              currentAnswer?.answer === ans?.answer
                ? classes.selectedOption
                : classes.option
            }
            onClick={() => handleSelectOption(ans)}
          >
            {ans?.answer}
          </div>
        ))}
      {history.length >= 1 && (
        <Button
          variant="contained"
          color="primary"
          size="large"
          onClick={handlePrev}
        >
          {"Previous"}
        </Button>
      )}
    </div>
  );
};

export default Questions;
