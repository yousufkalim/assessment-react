import React, { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import UserForm from "../components/UserForm";
import Questions from "../components/Questions";
import Result from "../components/Result";
import Landing from "../components/Landing";
import Header from "../components/Header";
import Stepper from "../components/Stepper";
import CustomizedDialogs from "../components/CirclerTimer";

const Home = () => {
  const [activeStep, setActiveStep] = useState(1);
  const [step, setStep] = useState(0);
  const [statetextforscroll, setStatetextforscroll] = useState("");

  return (
    <>
      <Header
        step={step}
        setStep={setStep}
        setActiveStep={setActiveStep}
        setStatetextforscroll={setStatetextforscroll}
      />
      {step === 0 && (
        <Landing
          step={step}
          setStep={setStep}
          statetextforscroll={statetextforscroll}
        />
      )}
      <div className="mainbody">
        {step >= 1 && (
          <Grid spacing={1} className="stepper">
            <Stepper activeStep={activeStep} setActiveStep={setActiveStep} />
          </Grid>
        )}
        {step === 1 && (
          <UserForm
            step={step}
            setStep={setStep}
            setActiveStep={setActiveStep}
          />
        )}
        {step === 2 && (
          <Questions
            step={step}
            setStep={setStep}
            setActiveStep={setActiveStep}
          />
        )}
        {console.log("step is ", step)}
        {step === 3 && <Result />}
      </div>
    </>
  );
};

export default Home;
