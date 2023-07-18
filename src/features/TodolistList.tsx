import React, {useCallback, useEffect} from 'react';
import {AppRootStateType, useAppDispatch} from "../App/store";
import {
    ChangeTodolistFilterAC,
    changeTodolistTitleTC,
    createTodolistTC,
    fetchTodolistsTC, FilterValuesType,
    removeTodolistTC,
    TodolistDomainType
} from "./Todolist/todolists-reducer";
import {useSelector} from "react-redux";
import {createTaskTC, removeTaskTC, TasksStateType, updateTaskTC} from "./Todolist/Task/tasks-reducer";
import {TaskStatuses} from "../api/todolists-api";
import AddItemForm from "../components/UI/AddItemForm/AddItemForm";
import Todolist from "./Todolist/Todolist";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import {Navigate} from "react-router-dom";
const TodolistList = () => {

    const isLoggedIn = useSelector<AppRootStateType>(state => state.auth.isLoggedIn)


    const dispatch = useAppDispatch()

    useEffect( () => {
        if (!isLoggedIn){
            return
        }
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

    if (!isLoggedIn) {
        return <Navigate to="/logIn"/>
    }

    return (
        <>
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
                                    entityStatus={tl.entityStatus}
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
        </>
    );
};

export default TodolistList;