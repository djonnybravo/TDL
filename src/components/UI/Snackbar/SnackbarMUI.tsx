import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Snackbar, {SnackbarOrigin} from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import {Box} from "@mui/material";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref,
) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});


export type SnackbarMUIPropsType = {
    alertType: "error" | "warning" | "info" | "success"
    message: string
}
interface State extends SnackbarOrigin {
    open: boolean;
}

export function SnackbarMUI(props: SnackbarMUIPropsType) {

    const [state, setState] = React.useState<State>({
        open: true,
        vertical: 'bottom',
        horizontal: 'center',
    });
    const { vertical, horizontal, open } = state;

    const handleClose = () => {
        setState({ ...state, open: false });
    };

    return (


            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose} anchorOrigin={{ vertical, horizontal }} >
                <Alert onClose={handleClose} severity={props.alertType} sx={{ width: '100%' }}>
                    {props.message}
                </Alert>
            </Snackbar>


    );
}