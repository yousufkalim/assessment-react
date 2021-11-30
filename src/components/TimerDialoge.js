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

  const handleDuration = () => {
    setDuration(600);
    setOpen(false);
  };
  const handleEndSection = () => {
    setStep(3);
    setActiveStep(3);
  };

  return (
    <div>
      {console.log(open)}
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
          <Button autoFocus onClick={handleEndSection}>
            NO
          </Button>
          <Button onClick={handleDuration} autoFocus>
            YES
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
