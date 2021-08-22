import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});
const a = [{ label: "a" }, { label: "a" }, { label: "a" }];

const DialogBox = ({ open, setOpen, singleRow, setSingleRow, Heading }) => {
  const DialogTitle = withStyles(styles)((props) => {
    const { children, classes, onClose, ...other } = props;
    return (
      <MuiDialogTitle disableTypography className={classes.root} {...other}>
        <Typography variant="h6">{children}</Typography>
        {onClose ? (
          <IconButton
            aria-label="close"
            className={classes.closeButton}
            onClick={onClose}
          >
            <CloseIcon />
          </IconButton>
        ) : null}
      </MuiDialogTitle>
    );
  });
  console.log("SingleRow", singleRow);
  console.log("heading in dialog", Heading);
  const DialogContent = withStyles((theme) => ({
    root: {
      padding: theme.spacing(2),
    },
  }))(MuiDialogContent);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setSingleRow(null);
    setOpen(false);
  };

  return (
    <div>
      <Dialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          User
        </DialogTitle>
        <DialogContent dividers>
          {Heading && (
            <table
              style={{
                border: "1px solid black",
                padding: "10px",
                margin: "10px",
              }}
            >
              <tr>
                {Heading.map((head) => (
                  <td
                    style={{
                      padding: "10px",
                      margin: "10px",
                    }}
                  >
                    {head.label}
                  </td>
                ))}
              </tr>
              <tr style={{ border: "5px solid black" }}>
                {singleRow &&
                  Heading.map((column) => (
                    <>
                      <td
                        style={{
                          borderRight: "1px solid black",
                          padding: "10px",
                          margin: "10px",
                        }}
                      >
                        {singleRow[column?.id]}
                      </td>
                    </>
                  ))}
              </tr>
            </table>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DialogBox;
