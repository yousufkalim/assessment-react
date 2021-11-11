import React, { useState,useEffect } from "react";
import ReactDOM from "react-dom";
import { CountdownCircleTimer } from "react-countdown-circle-timer";


import TimerDialog from "./TimerDialoge";

const renderTime = ( remainingTime,setStep, setActiveStep,setOpen,open,key,setKey) => {
  const hours = Math.floor(remainingTime / 3600)
  const minutes = Math.floor(remainingTime / 60)
  const seconds = remainingTime % 60
  

  if (remainingTime === 0) {
    setOpen(true);
   
  }
  if (remainingTime === 10) {
    // setStep(3);
    // setActiveStep(3);
  }
  console.log("open is",open)

  return (
    <div className="timeer">
      <div className="textt">Remaining</div>
      <div className="valuee">{hours}:{minutes}:{seconds}</div>
      <div className="textt">Time</div>
    </div>
  );
};

function QuestionsTimer({setStep, setActiveStep,setOpen,open,key,setKey}) {
useEffect(()=>{
    console.log("useeffect run")
},[open])
  console.log("openNNNN",open)
  return (
      <>
    <div className="App">
      <div className="timerwrapper">
        <CountdownCircleTimer
          key={key}
          isPlaying={!open?true:false}
          duration={10}
          size={0}
          // rotation={counterclockwise}
          colors={[["#fff"]]}
          // onComplete={() => [true, 1000]}
        >
        {({ remainingTime }) => renderTime(remainingTime, setStep, setActiveStep,setOpen,open)}
        </CountdownCircleTimer>
      </div>
    
    </div>
    </>
  );
}

export default QuestionsTimer;
