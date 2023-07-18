import React from 'react';
// import {AppBar, Box, Button, IconButton, LinearProgress, Toolbar, Typography} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import {useSelector} from "react-redux";
import {AppRootStateType, useAppDispatch} from "../../App/store";
import {RequestStatusType} from "../../App/app-reducer";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import LinearProgress from "@mui/material/LinearProgress";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import {logoutTC} from "../Login/auth-reducer";






const AppHeader = () => {
    const isLoggedIn = useSelector<AppRootStateType>(state => state.auth.isLoggedIn)
    const requestStatus = useSelector<AppRootStateType, RequestStatusType>(state => state.app.status)
    const dispatch = useAppDispatch()

    const logout = () => {
        dispatch(logoutTC())
    }


    return (
        <Box>
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{mr: 2}}
                    >
                        <MenuIcon/>
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                        News
                    </Typography>
                    { !isLoggedIn && <Button color="inherit" onClick={logout}>Log out</Button>}
                </Toolbar>
                {
                    requestStatus === "loading" && <LinearProgress/>
                }
            </AppBar>
        </Box>
    );
};

export default AppHeader;