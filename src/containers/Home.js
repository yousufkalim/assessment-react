import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import UserForm from "../components/UserForm";
import Questions from "../components/Questions";
import Result from "../components/Result";
import Landing from "../components/Landing";
import Header from "../components/Header";
import Stepper from "../components/Stepper";

const Home = () => {
  const [activeStep, setActiveStep] = useState(1);
  const [step, setStep] = useState(0);
  return (
    <>
      <Header />
      {step === 0 && <Landing step={step} setStep={setStep} />}
      <div className="mainbody">
        {step >= 1 && (
          <Grid container spacing={1} className="stepper">
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
        {step === 3 && <Result />}
      </div>
    </>
  );
};

export default Home;
