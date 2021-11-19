import React from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import ViewQuiltIcon from "@material-ui/icons/ViewQuilt";
import HelpIcon from "@material-ui/icons/Help";
import FlagIcon from "@material-ui/icons/Flag";
import CreateIcon from "@material-ui/icons/Create";
import StepConnector from "@material-ui/core/StepConnector";
import editicon from "../assets/icons/Frame.png";
import step1 from "../assets/icons/step1.png";
import step4 from "../assets/icons/step4.png";

const ColorlibConnector = withStyles({
  alternativeLabel: {
    top: 22,
  },
  active: {
    "& $line": {
      backgroundImage:
        "linear-gradient(265.05deg, #FECE24 0%, #FF6D1A 50.66%, #FF29AA 101.84%)",
    },
  },
  completed: {
    "& $line": {
      backgroundImage:
        "linear-gradient(265.05deg, #FECE24 0%, #FF6D1A 50.66%, #FF29AA 101.84%)",
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
      "linear-gradient(229.05deg, #FECE24 0%, #FF6D1A 50.66%, #FF29AA 101.84%)",
    boxShadow: "0 4px 10px 0 rgba(0,0,0,.25)",
  },
  completed: {
    backgroundImage:
      "linear-gradient(229.05deg, #FECE24 0%, #FF6D1A 50.66%, #FF29AA 101.84%)",
  },
});

function ColorlibStepIcon(props) {
  const classes = useColorlibStepIconStyles();
  const { active, completed } = props;

  const icons = {
    1: <img src={step1} />,
    2: <img src={editicon} />,
    3: <HelpIcon />,
    4: <img src={step4} />,
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
  return ["Departure!", "Who am I ?", "My test", "My results"];
}

export default function CustomizedSteppers({ activeStep, setActiveStep }) {
  const classes = useStyles();
  // const [activeStep, setActiveStep] = React.useState(1);
  const steps = getSteps();

  return (
    <div className="stepperMain">
      <Stepper
        alternativeLabel
        activeStep={activeStep}
        connector={<ColorlibConnector />}
        className="stepper"
      >
        {steps.map((label, index) => (
          <Step key={label}>
            <StepLabel StepIconComponent={ColorlibStepIcon}>
              <span
                className="steplabel"
                style={{
                  color: `${activeStep == index ? "white" : "gray"}`,
                }}
              >
                {label}
              </span>
            </StepLabel>
          </Step>
        ))}
      </Stepper>
    </div>
  );
}
