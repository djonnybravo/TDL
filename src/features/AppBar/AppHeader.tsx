import React from 'react';
import {AppBar, Box, Button, IconButton, LinearProgress, Toolbar, Typography} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import {useSelector} from "react-redux";
import {AppRootStateType} from "../../App/store";
import {RequestStatusType} from "../../App/app-reducer";

const AppHeader = () => {

    const requestStatus = useSelector<AppRootStateType, RequestStatusType>(state => state.app.status)


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
                    <Button color="inherit">Login</Button>
                </Toolbar>
                {
                    requestStatus === "loading" && <LinearProgress/>
                }
            </AppBar>
        </Box>
    );
};

export default AppHeader;