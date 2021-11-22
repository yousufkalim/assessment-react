import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";

export default function TimerDialog({
  open,
  setOpen,
  setStep,
  setActiveStep,
  duration,
  setDuration,
}) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  //  console.log("durantion is ", duration)

  const handleDuration = (open, setOpen, duration, setDuration) => {
    setDuration((prevduration) => prevduration + 10);
    setOpen(false);
  };
  const handleEndSection = (setStep, setActiveStep) => {
    setStep(3);
    setActiveStep(3);
  };

  return (
    <div>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
          {"Assessment time is completed!"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>Do you need more time?</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            autoFocus
            onClick={() => handleEndSection(setStep, setActiveStep)}
          >
            NO
          </Button>
          <Button
            onClick={() => handleDuration(open, setOpen, duration, setDuration)}
            autoFocus
          >
            YES
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
