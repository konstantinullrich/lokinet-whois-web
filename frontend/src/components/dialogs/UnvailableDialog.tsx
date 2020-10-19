import React from 'react';
import { 
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField
} from '@material-ui/core';

type Props = {
    query?: string,
    expirationHeight?: number;
    nameHash?: string;
    owner?: string;
    txId?: string;
    type?: number;
    updateHeight?: number;
    currentAddress?: string;
    open: boolean;
    onClose: () => void;
  }

function UnvailableDialog(props: Props) {
    return (
        <Dialog fullWidth open={props.open}>
        <DialogTitle>{props.query} is already registerd</DialogTitle>
        <DialogContent>
          <TextField 
            margin="dense"
            variant="outlined"
            id="expiration-height"
            label="Expiration Height"
            value={props.expirationHeight}
            fullWidth
            disabled
          />
          <TextField 
            margin="dense"
            variant="outlined"
            id="name-hash"
            label="Name Hash"
            value={props.nameHash}
            fullWidth
            disabled
          />
          <TextField 
            margin="dense"
            variant="outlined"
            id="owner"
            label="Owner"
            value={props.owner}
            fullWidth
            disabled
          />
          <TextField 
            margin="dense"
            variant="outlined"
            id="tx-id"
            label="Transaction Id"
            value={props.txId}
            fullWidth
            disabled
          />
          <TextField 
            margin="dense"
            variant="outlined"
            id="tyoe"
            label="Type"
            value={props.type}
            fullWidth
            disabled
          />
          <TextField 
            margin="dense"
            variant="outlined"
            id="update-height"
            label="Update Height"
            value={props.updateHeight}
            fullWidth
            disabled
          />
          <TextField 
            margin="dense"
            variant="outlined"
            id="current-address"
            label="Current Address"
            value={props.currentAddress}
            fullWidth
            disabled
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={props.onClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    )
}

export default UnvailableDialog;