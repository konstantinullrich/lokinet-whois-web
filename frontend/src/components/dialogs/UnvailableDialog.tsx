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
        <DialogTitle>{props.query} is already registered</DialogTitle>
        <DialogContent>
          <TextField 
            id="expiration-height"
            margin="dense"
            variant="outlined"
            label="Expiration Height"
            value={props.expirationHeight}
            fullWidth
            disabled
          />
          <TextField 
            id="name-hash"
            margin="dense"
            variant="outlined"
            label="Name Hash"
            value={props.nameHash}
            fullWidth
            disabled
          />
          <TextField 
            id="owner"
            margin="dense"
            variant="outlined"
            label="Owner"
            value={props.owner}
            fullWidth
            disabled
          />
          <TextField 
            id="tx-id"
            margin="dense"
            variant="outlined"
            label="Transaction Id"
            value={props.txId}
            fullWidth
            disabled
          />
          <TextField 
            id="type"
            margin="dense"
            variant="outlined"
            label="Type"
            value={props.type}
            fullWidth
            disabled
          />
          <TextField 
            id="update-height"
            margin="dense"
            variant="outlined"
            label="Update Height"
            value={props.updateHeight}
            fullWidth
            disabled
          />
          <TextField 
            id="current-address"
            margin="dense"
            variant="outlined"
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