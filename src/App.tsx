import React, {useState} from 'react';
import './App.css';
import Todolist from "./Todolist";
import {v1} from "uuid";
import todolist from "./Todolist";


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
    const [tasksObj, setTasks] = useState({
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

    const removeTask = (taskID: string, todolistID: string) => {

        const tasks = tasksObj[todolistID]
        tasksObj[todolistID] = tasks.filter(t => t.id !== taskID)
        setTasks({...tasksObj})
    }
    const addTask = (title: string, todolistID: string) => {
        let task = {id: v1(), title: title, isDone: false};
        const tasks = tasksObj[todolistID]
        tasksObj[todolistID] = [task, ...tasks]
        setTasks({...tasksObj});

    }
    const changeTaskStatus = (taskID: string, isDone: boolean, todolistID: string) => {
        const tasks = tasksObj[todolistID]
        let task = tasks.find(t => t.id === taskID);
        if (task) {
            task.isDone = isDone
            tasksObj[todolistID] = tasks
            setTasks({...tasksObj})
        }
    }
    const changeFilter = (value: FilterValuesType, todolistID: string) => {
        let todolist = todolists.find(tl => tl.id === todolistID)
        if (todolist) {
            todolist.filter = value
            setTodolists([...todolists])
        }
    }
    const removeTodolist = (todolistID: string) => {
        let filteredTodolist = todolists.filter(tl => tl.id !== todolistID)
        setTodolists([...filteredTodolist])
        delete tasksObj[todolistID]
        setTasks(tasksObj)
    }


    return (
        <div className="App">
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
                    />
                })
            }

        </div>
    );
}

export default App;
