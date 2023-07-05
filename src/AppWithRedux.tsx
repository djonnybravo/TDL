import React, {useCallback, useEffect} from 'react';
import './App.css';
import Todolist from "./components/Todolist";
import AddItemForm from "./components/AddItemForm";
import {

    ChangeTodolistFilterAC,
     changeTodolistTitleTC, createTodolistTC, fetchTodolistsTC, FilterValuesType,
     removeTodolistTC, TodolistDomainType,
} from "./state/todolists-reducer";
import {
    createTaskTC,
    removeTaskTC, updateTaskTC
} from "./state/tasks-reducer";
import { useSelector} from "react-redux";
import {AppRootStateType, useAppDispatch} from "./state/store";
import {AppBar, Box, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import {TaskStatuses, TaskType} from "./api/todolists-api";




export type TasksStateType = {
    [key: string]: TaskType[]
}

function AppWithRedux() {
    console.log("app rendering")

    const dispatch = useAppDispatch()

    useEffect( () => {
        dispatch(fetchTodolistsTC())
    }, [])

    const todolists = useSelector<AppRootStateType, Array<TodolistDomainType>>(state => state.todolists)
    const tasksObj = useSelector<AppRootStateType, TasksStateType>(state => state.tasks)



    const removeTask = useCallback((taskID: string, todolistID: string) => dispatch(removeTaskTC(todolistID, taskID)), [dispatch])
    const addTask = useCallback((title: string, todolistID: string) => dispatch(createTaskTC(todolistID, title)), [dispatch])
    const changeTaskStatus = useCallback((taskID: string, status: TaskStatuses, todolistID: string) => {

        dispatch(updateTaskTC(taskID, {status}, todolistID))
    }, [dispatch])

    const changeTaskTitle = useCallback((taskId: string, NewTitle: string, todolistID: string) => {
        dispatch(updateTaskTC(taskId, {title: NewTitle}, todolistID))
    }, [dispatch])

    const addTodolist = useCallback((title: string) => dispatch(createTodolistTC(title)), [dispatch])
    const removeTodolist = useCallback((todolistID: string) => {
        dispatch(removeTodolistTC(todolistID))
    }, [dispatch])
    const changeTodolistTitle = useCallback((newTitle: string, todolistID: string) => {
        dispatch(changeTodolistTitleTC(todolistID, newTitle))
    }, [dispatch])
    const changeFilter = useCallback((value: FilterValuesType, todolistID: string) => {
        dispatch(ChangeTodolistFilterAC(todolistID, value))
    }, [dispatch])


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

            <Grid container style={{padding: "20px"}} spacing={4}>
                <Grid item >
                    <Paper style={{padding: "20px", margin: "0"}} elevation={24}   >
                        <span style={{marginBottom: "90px"}}>Создай новый тудулист</span>
                        <AddItemForm addItem={addTodolist}/>
                    </Paper>
                </Grid>
            </Grid>

            <Container >
                <Grid container spacing={4}>
                    {
                        todolists.map(tl => {
                            return <Grid item key={tl.id}>

                                <Todolist
                                    todolistID={tl.id}
                                    title={tl.title}
                                    tasks={tasksObj[tl.id]}
                                    removeTask={removeTask}
                                    changeFilter={changeFilter}
                                    addTask={addTask}
                                    changeTaskStatus={changeTaskStatus}
                                    filter={tl.filter}
                                    removeTodolist={removeTodolist}
                                    changeTaskTitle={changeTaskTitle}
                                    changeTodolistTitle={changeTodolistTitle}
                                />

                            </Grid>
                        })
                    }
                </Grid>
            </Container>
        </div>
    );

}
export default AppWithRedux;
