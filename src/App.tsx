import React, {useState} from 'react';
import './App.css';
import Todolist from "./Todolist";
import {v1} from "uuid";


export type FilterValuesType = 'All' | 'Completed' | 'Active'
type TodolistsType = {
    id: string;
    title: string
    filter: FilterValuesType
}

function App() {

    const todolistId1 = v1()
    const todolistId2 = v1()
    const [todolists, setTodolists] = useState<Array<TodolistsType>>([
        {id: todolistId1, title: "Что выучить:", filter: "All"},
        {id: todolistId2, title: "Что купить:", filter: "Active"}
    ])


    const [tasks, setTasks] = useState(
        {
            todolistId1: [
                {id: v1(), title: 'HTML&CSS', isDone: true},
                {id: v1(), title: 'JS', isDone: true},
                {id: v1(), title: 'React', isDone: false}
            ],
            todolistId2: [
                {id: v1(), title: 'Молоко', isDone: true},
                {id: v1(), title: 'Сахар', isDone: true},
                {id: v1(), title: 'Кофе', isDone: false}
            ]
        }
    )

    const removeTask = (taskID: string) => {
        let removedTasks = tasks.filter(t => t.id !== taskID)
        setTasks(removedTasks)
    }
    const addTask = (title: string) => {
        let newTask = {id: v1(), title: title, isDone: false}
        setTasks([newTask, ...tasks])
    }
    const changeTaskStatus = (taskID: string, isDone: boolean) => {
        let newTask = tasks.find(t => t.id === taskID)
        if (newTask) {
            newTask.isDone = isDone
        }

        setTasks([...tasks])
    }
    const changeFilter = (value: FilterValuesType, todolistID: string) => {
        let todolist = todolists.find(tl => tl.id === todolistID)
        if (todolist) {
            todolist.filter = value
            setTodolists([...todolists])
        }
    }


    return (
        <div className="App">
            {
                todolists.map((todolist) => {

                    let taskForTodolist = tasks
                    if (todolist.filter === "Completed") {
                        taskForTodolist = tasks.filter(t => t.isDone)
                    }
                    if (todolist.filter === "Active") {
                        taskForTodolist = tasks.filter(t => !t.isDone)
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
                    />
                })
            }

        </div>
    );
}

export default App;
