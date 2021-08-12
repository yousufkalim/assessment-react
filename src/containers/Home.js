import React, { useState } from "react";
import UserForm from "../components/UserForm";
import Questions from "../components/Questions";
import Result from "../components/Result";

const Home = () => {
  const [step, setStep] = useState(1);
  return (
    <div>
      {step === 1 && <UserForm step={step} setStep={setStep} />}
      {step === 2 && <Questions step={step} setStep={setStep} />}
      {step === 3 && <Result />}
    </div>
  );
};

export default Home;
