import * as React from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import {useSelector} from "react-redux";
import {AppRootStateType, useAppDispatch,} from "../../../App/store";
import {setAppErrorAC} from "../../../App/app-reducer";

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
    const dispatch = useAppDispatch()


    const isOpen = error !== null
    const handleClose = () => {
       dispatch(setAppErrorAC(null))
    };


    return (

        <Snackbar open={isOpen} autoHideDuration={6000} onClose={handleClose} anchorOrigin={{vertical: "bottom", horizontal: "center"}} >
            <Alert onClose={handleClose} severity={props.alertType} sx={{ width: '100%' }}>
                {error}
            </Alert>
        </Snackbar>




    );
}