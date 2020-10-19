import React from 'react';
import { 
    Button,
    Dialog,
    DialogActions,
    DialogTitle,
} from '@material-ui/core';

type Props = {
    query?: string,
    open: boolean;
    onClose: () => void;
  }

function AvailableDialog(props: Props) {
    return (
        <Dialog fullWidth open={props.open}>
        <DialogTitle>{props.query} is available</DialogTitle>
        <DialogActions>
          <Button onClick={props.onClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    )
}

export default AvailableDialog;