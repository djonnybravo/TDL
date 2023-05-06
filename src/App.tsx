import React, {useState} from 'react';
import './App.css';
import Todolist from "./Todolist";
import {v1} from "uuid";


export type FilterValuesType = 'All' | 'Completed' | 'Active'

function App() {

    const [tasks, setTasks] = useState([
        {id: v1(), title: 'HTML&CSS', isDone: true},
        {id: v1(), title: 'JS', isDone: true},
        {id: v1(), title: 'React', isDone: false}
    ])
    const [filter, setFilter] = useState<FilterValuesType>('All')
    const removeTask = (taskID: string) => {
        let removedTasks = tasks.filter(t => t.id !== taskID)
        setTasks(removedTasks)
    }
    const addTask = (title: string) => {
        let newTask = {id: v1(), title: title, isDone: false}
        setTasks([newTask, ...tasks])
    }
    const changeFilter = (value: FilterValuesType) => {
        setFilter(value)
    }
    const changeTaskStatus = (taskID:string, isDone:boolean) => {
        let newTask = tasks.find(t => t.id  === taskID)
        if (newTask) {
            newTask.isDone = isDone
        }

        setTasks([...tasks])
    }
    let taskForTodolist = tasks
    if (filter === "Completed") {
        taskForTodolist = tasks.filter(t => t.isDone)
    }
    if (filter === "Active") {
        taskForTodolist = tasks.filter(t => !t.isDone)
    }

    return (
        <div className="App">
            <Todolist
                title={'What to learn'}
                tasks={taskForTodolist}
                removeTask={removeTask}
                addTask={addTask}
                changeFilter={changeFilter}
                changeTaskStatus={changeTaskStatus}
                filter={filter}
            />
        </div>
    );
}

export default App;
