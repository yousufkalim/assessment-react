import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { CountdownCircleTimer } from "react-countdown-circle-timer";

const renderTime = (
  remainingTime,
  setStep,
  setActiveStep,
  setOpen,
  open,
  key,
  setKey
) => {
  const hours = Math.floor(remainingTime / 3600);
  const minutes = Math.floor(remainingTime / 60);
  const seconds = remainingTime % 60;

  if (remainingTime === 0) {
    setOpen(true);
  }
  if (remainingTime === 10) {
    // setStep(3);
    // setActiveStep(3);
  }
  console.log("open is", open);

  return (
    <p className="timeer">
      Remaining Time: {hours}:{minutes}:{seconds}
    </p>
  );
};

function QuestionsTimer({
  setStep,
  setActiveStep,
  setOpen,
  open,
  key,
  duration,
  setDuration,
}) {
  console.log("duration is ", duration);
  return (
    <>
      <div className="App">
        <div className="timerwrapper">
          <CountdownCircleTimer
            key={key}
            isPlaying={!open ? true : false}
            duration={duration}
            size={0}
            // rotation={counterclockwise}
            colors={[["#fff"]]}
            // onComplete={() => [true, 1000]}
          >
            {({ remainingTime }) =>
              renderTime(
                remainingTime,
                setStep,
                setActiveStep,
                setOpen,
                open,
                duration,
                setDuration
              )
            }
          </CountdownCircleTimer>
        </div>
      </div>
    </>
  );
}

export default QuestionsTimer;
