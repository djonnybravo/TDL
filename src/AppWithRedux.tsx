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
    console.log("app render")


    const dispatch = useDispatch()
    const todolists = useSelector<AppRootStateType, Array<TodolistsType>>(state => state.todolists)
    const tasksObj = useSelector<AppRootStateType, TasksStateType>(state => state.tasks)




    const removeTask = useCallback((taskID: string, todolistID: string) =>  dispatch(removeTaskAC(taskID, todolistID)), [])

    const addTask = useCallback((title: string, todolistID: string) =>  dispatch(addTaskAC(title, todolistID)), [])

    const changeTaskStatus = useCallback((taskID: string, isDone: boolean, todolistID: string) => {
        dispatch(changeTaskStatusAC(taskID,isDone,todolistID))
    }, [])
    const changeTaskTitle = useCallback((taskId: string, NewTitle: string, todolistID: string) => {
        dispatch(changeTaskTitleAC(taskId, NewTitle, todolistID))
    }, [])

    const addTodolist = useCallback((title: string) => {

        const action = AddTodolistAC(title)
        dispatch(action)
    }, [])
    const removeTodolist = useCallback( (todolistID: string) => {
        dispatch(RemoveTodolistAC(todolistID))
    }, [])
    const changeTodolistTitle = useCallback((newTitle: string, todolistID: string) => {
        dispatch(ChangeTitleTodolistAC(newTitle, todolistID))
    }, [])
    const changeFilter = useCallback((value: FilterValuesType, todolistID: string) => {
        dispatch(ChangeFilterTodolistAC(todolistID, value))
    }, [])

    return (
        <div className="App">

            <div style={
                {
                    padding: "20px",
                    border: "2px solid blue",
                    display: "flex",
                    alignItems: "center",
                    flexDirection: "column"
                }}>
               <span style={{marginBottom: "90px"}}>Создай новый тудулист</span>
                <AddItemForm addItem={addTodolist}/>
            </div>

            {
                todolists.map((todolist) => {

                    let taskForTodolist = tasksObj[todolist.id]



                    return <Todolist
                        key={todolist.id}
                        todolistID={todolist.id}
                        title={todolist.title}
                        tasks={taskForTodolist}
                        removeTask={removeTask}
                        addTask={addTask}
                        changeFilter={changeFilter}
                        changeTaskStatus={changeTaskStatus}
                        filter={todolist.filter}
                        removeTodolist={removeTodolist}
                        changeTodolistTitle={changeTodolistTitle}
                        changeTaskTitle={changeTaskTitle}
                    />
                })
            }
        </div>
    );
}

export default AppWithRedux;
