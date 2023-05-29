import React, {useReducer, useState} from 'react';
import './App.css';
import Todolist, {TaskType} from "./components/Todolist";
import {v1} from "uuid";
import AddItemForm from "./components/AddItemForm";
import {
    AddTodolistAC,
    ChangeFilterTodolistAC,
    ChangeTitleTodolistAC,
    RemoveTodolistAC,
    todolistsReducer
} from "./state/todolists-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from "./state/tasks-reducer";



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

    const todolistId1 = v1()
    const todolistId2 = v1()

    const [todolists, dispatchToTodolist] = useReducer(todolistsReducer, [
        {id: todolistId1, title: "Что выучить:", filter: "All"},
        {id: todolistId2, title: "Что купить:", filter: "Active"}
    ])
    const [tasksObj, dispatchToTasks] = useReducer(tasksReducer,{
        [todolistId1]: [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: false},
            {id: v1(), title: 'React', isDone: false}
        ],
        [todolistId2]: [
            {id: v1(), title: 'Молоко', isDone: false},
            {id: v1(), title: 'Сахар', isDone: true},
            {id: v1(), title: 'Кофе', isDone: false}
        ]
    })

    const removeTask = (taskID: string, todolistID: string) =>  dispatchToTasks(removeTaskAC(taskID, todolistID))

    const addTask = (title: string, todolistID: string) =>  dispatchToTasks(addTaskAC(title, todolistID))


    const changeTaskStatus = (taskID: string, isDone: boolean, todolistID: string) => {
       dispatchToTasks(changeTaskStatusAC(taskID,isDone,todolistID))
    }
    const changeTaskTitle = (taskId: string, NewTitle: string, todolistID: string) => {
      dispatchToTasks(changeTaskTitleAC(taskId, NewTitle, todolistID))
    }

    const addTodolist = (title: string) => {

        const action = AddTodolistAC(title)
        dispatchToTodolist(action)
        dispatchToTasks(action)
    }

    const removeTodolist = (todolistID: string) => {
       dispatchToTodolist(RemoveTodolistAC(todolistID))
       dispatchToTasks(RemoveTodolistAC(todolistID))
    }
    const changeTodolistTitle = (newTitle: string, todolistID: string) => {
      dispatchToTodolist(ChangeTitleTodolistAC(newTitle, todolistID))
    }
    const changeFilter = (value: FilterValuesType, todolistID: string) => {
      dispatchToTodolist(ChangeFilterTodolistAC(todolistID, value))
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
