import React from "react";
import PropTypes from "prop-types";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import SettingsIcon from "@material-ui/icons/Settings";
import GroupAddIcon from "@material-ui/icons/GroupAdd";
import VideoLabelIcon from "@material-ui/icons/VideoLabel";
import ViewQuiltIcon from "@material-ui/icons/ViewQuilt";
import HelpIcon from "@material-ui/icons/Help";
import FlagIcon from "@material-ui/icons/Flag";
import CreateIcon from "@material-ui/icons/Create";
import StepConnector from "@material-ui/core/StepConnector";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

const ColorlibConnector = withStyles({
  alternativeLabel: {
    top: 22,
  },
  active: {
    "& $line": {
      backgroundImage:
        "linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)",
    },
  },
  completed: {
    "& $line": {
      backgroundImage:
        "linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)",
    },
  },
  line: {
    height: 8,
    border: 0,
    background: "#000000",
    borderRadius: 1,
  },
})(StepConnector);

const useColorlibStepIconStyles = makeStyles({
  root: {
    background: "#343747",
    zIndex: 1,
    color: "#fff",
    width: 50,
    height: 50,
    display: "flex",
    borderRadius: "50%",
    justifyContent: "center",
    alignItems: "center",
  },
  active: {
    backgroundImage:
      "linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)",
    boxShadow: "0 4px 10px 0 rgba(0,0,0,.25)",
  },
  completed: {
    backgroundImage:
      "linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)",
  },
});

function ColorlibStepIcon(props) {
  const classes = useColorlibStepIconStyles();
  const { active, completed } = props;

  const icons = {
    1: <ViewQuiltIcon />,
    2: <CreateIcon />,
    3: <HelpIcon />,
    4: <FlagIcon />,
  };

  return (
    <div
      className={clsx(classes.root, {
        [classes.active]: active,
        [classes.completed]: completed,
      })}
    >
      {icons[String(props.icon)]}
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: "50%",
  },
  button: {
    marginRight: theme.spacing(1),
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
}));

function getSteps() {
  return ["Depart !", "Qui suis-je ?", "Mon test", "Mes resultats"];
}

function getStepContent(step) {
  switch (step) {
    case 0:
      return "Select campaign settings...";
    case 1:
      return "What is an ad group anyways?";
    case 2:
      return "This is the bit I really care about!";
    case 3:
      return "last";
    default:
      return "Unknown step";
  }
}

export default function CustomizedSteppers() {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(1);
  const steps = getSteps();

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <div className={classes.root}>
      <Stepper
        alternativeLabel
        activeStep={activeStep}
        connector={<ColorlibConnector />}
        className="stepper"
      >
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel StepIconComponent={ColorlibStepIcon}>
              <span
                style={{
                  color: "gray",
                }}
              >
                {label}
              </span>
            </StepLabel>
          </Step>
        ))}
      </Stepper>
      <div>
        {activeStep === steps.length ? (
          <div>
            {/* <Typography className={classes.instructions}>
              All steps completed - you&apos;re finished
            </Typography>
            <Button onClick={handleReset} className={classes.button}>
              Reset
            </Button> */}
          </div>
        ) : (
          <div>
            {/* <Typography className={classes.instructions}>
              {getStepContent(activeStep)}
            </Typography> */}
            <div>
              {/* <Button
                disabled={activeStep === 0}
                onClick={handleBack}
                className={classes.button}
              >
                Back
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={handleNext}
                className={classes.button}
              >
                {activeStep === steps.length - 1 ? "Finish" : "Next"}
              </Button> */}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
