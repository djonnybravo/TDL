import React, {useCallback, useEffect} from 'react';
import './App.css';
import Todolist from "../features/Todolist/Todolist";
import AddItemForm from "../components/UI/AddItemForm/AddItemForm";
import {

    ChangeTodolistFilterAC,
     changeTodolistTitleTC, createTodolistTC, fetchTodolistsTC, FilterValuesType,
     removeTodolistTC, TodolistDomainType,
} from "../features/Todolist/todolists-reducer";
import {
    createTaskTC,
    removeTaskTC, updateTaskTC
} from "../features/Todolist/Task/tasks-reducer";
import { useSelector} from "react-redux";
import {AppRootStateType, useAppDispatch} from "./store";
import {AppBar, Box, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import {TaskStatuses, TaskType} from "../api/todolists-api";
import TodolistList from "../features/TodolistList";




export type TasksStateType = {
    [key: string]: TaskType[]
}

function App() {
    console.log("app rendering")




    return (
        <div className="App">
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
                </AppBar>
            </Box>

            <TodolistList/>
        </div>
    );

}
export default App;
