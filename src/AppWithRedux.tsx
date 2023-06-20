import React, {useCallback} from 'react';
import './App.css';
import Todolist, {TaskType} from "./components/Todolist";
import AddItemForm from "./components/AddItemForm";
import {
    AddTodolistAC,
    ChangeFilterTodolistAC,
    ChangeTitleTodolistAC,
    RemoveTodolistAC,
} from "./state/todolists-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./state/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";
import {AppBar, Box, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';


export type FilterValuesType = 'All' | 'Completed' | 'Active'
export type TodolistsType = {
    id: string;
    title: string
    filter: FilterValuesType
}

export type TasksStateType = {
    [key: string]: TaskType[]
}

function AppWithRedux() {
    console.log("app rendering")


    const dispatch = useDispatch()
    const todolists = useSelector<AppRootStateType, Array<TodolistsType>>(state => state.todolists)
    const tasksObj = useSelector<AppRootStateType, TasksStateType>(state => state.tasks)


    const removeTask = useCallback((taskID: string, todolistID: string) => dispatch(removeTaskAC(taskID, todolistID)), [dispatch])

    const addTask = useCallback((title: string, todolistID: string) => dispatch(addTaskAC(title, todolistID)), [dispatch])

    const changeTaskStatus = useCallback((taskID: string, isDone: boolean, todolistID: string) => {
        dispatch(changeTaskStatusAC(taskID, isDone, todolistID))
    }, [dispatch])
    const changeTaskTitle = useCallback((taskId: string, NewTitle: string, todolistID: string) => {
        dispatch(changeTaskTitleAC(taskId, NewTitle, todolistID))
    }, [dispatch])

    const addTodolist = useCallback((title: string) => {

        const action = AddTodolistAC(title)
        dispatch(action)
    }, [dispatch])
    const removeTodolist = useCallback((todolistID: string) => {
        dispatch(RemoveTodolistAC(todolistID))
    }, [dispatch])
    const changeTodolistTitle = useCallback((newTitle: string, todolistID: string) => {
        dispatch(ChangeTitleTodolistAC(newTitle, todolistID))
    }, [dispatch])
    const changeFilter = useCallback((value: FilterValuesType, todolistID: string) => {
        dispatch(ChangeFilterTodolistAC(todolistID, value))
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
    ;
}

export default AppWithRedux;
