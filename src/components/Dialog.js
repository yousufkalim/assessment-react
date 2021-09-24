import * as React from 'react';
import { styled } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Grid from "@material-ui/core/Grid";
import { Checkbox } from "@material-ui/core";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuDialogActions-root': {
        padding: theme.spacing(1),
    },
}));
export default function DialogBox({ open, setOpen }) {
    const handleClose = () => {
        setOpen(false);
    };
    return (
        <div>
            <BootstrapDialog
                onClose={handleClose}
                open={open}
            >
                <IconButton
                    className="closeButton"
                    aria-label="close"
                    onClick={handleClose}
                >
                    <CloseIcon style={{ color: "white" }} />
                </IconButton>
                <DialogContent className="modalcontent">
                    <h3 className="dialogHeading">Besoin de plus d'informations<br /> sur ton projet d'études ? </h3>
                    <Grid container spacing={1} className="">
                        <Checkbox
                            inputProps={{ "aria-label": "secondary checkbox" }}
                            style={{ color: "white" }}
                            name="accept_condition"
                        // value={accept_condition}
                        // onChange={onChange}
                        />
                        <span className="dialogcheckboxtext">
                            Je veux recevoir des conseils, des informations, et des invitations à des <br />événements d'orientation en rapport avec mon projet.
                        </span>
                    </Grid>
                    <Grid container spacing={1} className="">
                        <Checkbox
                            inputProps={{ "aria-label": "secondary checkbox" }}
                            style={{ color: "white" }}
                            name="accept_condition"
                        // value={accept_condition}
                        // onChange={onChange}
                        />
                        <span className="dialogcheckboxtext">
                            Je souhaite être contacté gratuitement par un conseiller Orientator pour<br /> répondre davantage à mes questions ou clarifier certains aspects de mon<br /> projet.
                        </span>
                    </Grid>
                    <Grid container spacing={1} className="dialoginputGrid">
                        <input
                            type="email"
                            name="email"
                            //   value={email}
                            //   onChange={onChange}
                            placeholder="E-mail"
                            className="dialoginputField"
                            required
                        />
                    </Grid>
                    <Grid container spacing={1} className="dialoginputGrid">
                        <input
                            type="email"
                            name="email"
                            //   value={email}
                            //   onChange={onChange}
                            placeholder="Number"
                            className="dialoginputField"
                            required
                        />
                    </Grid>
                </DialogContent>
                <div className="dialogAction">
                    <button className="modalButon" onClick={handleClose}>
                        Envoyer
                    </button>
                </div>
            </BootstrapDialog>
        </div >
    );
}
