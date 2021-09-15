import React, { useState } from "react";
import UserForm from "../components/UserForm";
import Questions from "../components/Questions";
import Result from "../components/Result";
import Landing from "../components/Landing";
import Header from "../components/Header";

const Home = () => {
  const [step, setStep] = useState(0);
  return (
    <div>
      <Header />
      {step === 0 && <Landing step={step} setStep={setStep} />}

      {step === 1 && <UserForm step={step} setStep={setStep} />}
      {step === 2 && <Questions step={step} setStep={setStep} />}
      {step === 3 && <Result />}
    </div>
  );
};

export default Home;
