import React, { useState } from "react";
import UserForm from "../components/UserForm";
import Questions from "../components/Questions";
import Result from "../components/Result";
import Landing from "../components/Landing";
import Header from "../components/Header";
import Grid from "@material-ui/core/Grid";
import Stepper from "../components/Stepper";

const Home = () => {
  const [activeStep, setActiveStep] = useState(1);
  const [step, setStep] = useState(0);
  return (
    <div>
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
      </div>
      {step === 3 && <Result />}
    </div>
  );
};

export default Home;
