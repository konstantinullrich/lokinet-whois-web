import React from 'react';
import clsx from 'clsx';
import {
    IconButton,
    Snackbar,
    SnackbarContent,
    makeStyles
} from '@material-ui/core';
import { amber, green } from '@material-ui/core/colors';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Error';
import InfoIcon from '@material-ui/icons/Info';
import CloseIcon from '@material-ui/icons/Close';
import WarningIcon from '@material-ui/icons/Warning';

const variantIcon = {
    success: CheckCircleIcon,
    warning: WarningIcon,
    error: ErrorIcon,
    info: InfoIcon,
};

const useStyles1 = makeStyles(theme => ({
    success: {
        backgroundColor: green[600],
    },
    error: {
        backgroundColor: theme.palette.error.dark,
    },
    info: {
        backgroundColor: theme.palette.primary.dark,
    },
    warning: {
        backgroundColor: amber[700],
    },
    icon: {
        fontSize: 20,
    },
    iconVariant: {
        opacity: 0.9,
        marginRight: theme.spacing(1),
    },
    message: {
        display: 'flex',
        alignItems: 'center',
    },
}));

type Props = {
    className?: string;
    open: boolean;
    message: string;
    onClose: () => void;
    variant: 'success' | 'warning' | 'error' | 'info';
}

/**
 * A custom wrapper for the Material Snackbar component
 *
 * @param {Object} props - The Properties of the Component
 * @param {boolean} props.open - The open state of the Component
 * @param props.message - The Message displayed in the Snackbar
 * @param {function} props.onClose - closing handler
 * @param {string} props.variant - the variant of the Snackbar available: ['success', 'warning', 'error', 'info']
 * @returns {React.Component}
 */
function StatusSnackbar(props: Props) {
    const classes = useStyles1();
    const { className, message, onClose, variant, open, ...other } = props;
    const Icon = variantIcon[variant];

    return (
        <Snackbar
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'center'
            }}
            open={open}
            autoHideDuration={6000}
            onClose={onClose}
            data-testid="status_snackbar">
            <SnackbarContent
                className={clsx(classes[variant], className)}
                aria-describedby="client-snackbar"
                message={
                    <span id="client-snackbar" className={classes.message}>
                        <Icon className={clsx(classes.icon, classes.iconVariant)} />
                        {message}
                    </span>
                }
                action={[
                    <IconButton key="close" aria-label="Close" color="inherit" onClick={onClose} data-testid="close_button">
                        <CloseIcon className={classes.icon}/>
                    </IconButton>,
                ]}
                {...other}
            />
        </Snackbar>
    );
}

export default StatusSnackbar;