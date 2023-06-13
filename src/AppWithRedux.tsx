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




    const removeTask = (taskID: string, todolistID: string) =>  dispatch(removeTaskAC(taskID, todolistID))

    const addTask = (title: string, todolistID: string) =>  dispatch(addTaskAC(title, todolistID))


    const changeTaskStatus = (taskID: string, isDone: boolean, todolistID: string) => {
        dispatch(changeTaskStatusAC(taskID,isDone,todolistID))
    }
    const changeTaskTitle = (taskId: string, NewTitle: string, todolistID: string) => {
        dispatch(changeTaskTitleAC(taskId, NewTitle, todolistID))
    }

    const addTodolist = useCallback((title: string) => {

        const action = AddTodolistAC(title)
        dispatch(action)
    }, [])

    const removeTodolist = (todolistID: string) => {
        dispatch(RemoveTodolistAC(todolistID))
    }
    const changeTodolistTitle = (newTitle: string, todolistID: string) => {
        dispatch(ChangeTitleTodolistAC(newTitle, todolistID))
    }
    const changeFilter = (value: FilterValuesType, todolistID: string) => {
        dispatch(ChangeFilterTodolistAC(todolistID, value))
    }

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
                    if (todolist.filter === "Completed") {
                        taskForTodolist = taskForTodolist.filter(t => t.isDone)
                    }
                    if (todolist.filter === "Active") {
                        taskForTodolist = tasksObj[todolist.id].filter(t => !t.isDone)
                    }


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
