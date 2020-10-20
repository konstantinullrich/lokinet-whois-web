import React from 'react';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    TextField
} from '@material-ui/core';

type Props = {
    open: boolean;
    onClose: () => void;
}

const lokiAddress = 'L8eYrV5mt364qm64Lp2n1hGo883m4rqLS45H111FVvqbLAGTSbfFL9RGWGvXFR9Qir6fHWJoBgMNNCT9CUGSECuAFAmMg83';

function InfoDialog(props: Props) {
    return (
        <Dialog fullWidth open={props.open}>
        <DialogTitle>Loki WhoIs by Konstantin Ullrich</DialogTitle>
        <DialogContent>
            <DialogContentText>
                Loki WhoIs runs on the JVM and React, because QuickBasic is apparently not 'professional' enough.
                <br /><br />
                It would be cool if you could donate some Loki, to keep the service running and ad free. 
            </DialogContentText>
            <TextField 
                id="loki-address"
                margin="dense"
                variant="outlined"
                label="Loki Address"
                value={lokiAddress}
                fullWidth
                disabled
            />
        </DialogContent>
        <DialogActions>
          <Button id="close-info-dialog-button" color="primary" onClick={props.onClose}>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    )
}

export default InfoDialog;