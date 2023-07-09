import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Snackbar, {SnackbarOrigin} from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import {Box} from "@mui/material";
import {useSelector} from "react-redux";
import {AppRootStateType} from "../../../App/store";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref,
) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});


export type SnackbarMUIPropsType = {
    alertType: "error" | "warning" | "info" | "success"
}

export function SnackbarMUI(props: SnackbarMUIPropsType) {

    const error = useSelector<AppRootStateType, string | null>(state => state.app.error)
    const vertical = 'bottom'
    const horizontal = 'center'

    const isOpen = error !== null
    const handleClose = () => {

    };


    return (

        <Snackbar open={isOpen} autoHideDuration={6000} onClose={handleClose} anchorOrigin={{vertical, horizontal}} >
            <Alert onClose={handleClose} severity={props.alertType} sx={{ width: '100%' }}>
                {error}
            </Alert>
        </Snackbar>




    );
}