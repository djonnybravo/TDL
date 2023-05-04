import React, {useState} from 'react';
import {FilterValuesType} from "./App";


type PropsType = {
    title: string
    tasks: TaskType[]
    removeTask: (id:string) => void
    addTask: (title:string) => void
    changeFilter: (value: FilterValuesType) => void
}

type TaskType = {
    id: string
    title: string
    isDone: boolean
}
const Todolist = (props:PropsType) => {

    const [newTaskTitle, setNewTaskTitle] = useState(' ')

    return (
            <div>
                <h3>{props.title}</h3>
                <div>
                    <input value={newTaskTitle} onChange={(e) => {setNewTaskTitle(e.currentTarget.value)} }/>
                    <button onClick={ () => {props.addTask(newTaskTitle); setNewTaskTitle('')}}>+</button>
                </div>
                <ul>
                    {
                        props.tasks.map(task =>
                        <li key={task.id}>
                            <input type="checkbox" checked={task.isDone}/>
                            <span>{task.title} </span>
                            <button onClick={() => {props.removeTask(task.id)}}>x</button>
                        </li>
                    )}
                </ul>
                <div>
                    <button onClick={()=>{props.changeFilter('All')}}>All</button>
                    <button onClick={()=>{props.changeFilter('Active')}}>Active</button>
                    <button onClick={()=>{props.changeFilter('Completed')}}>Completed</button>
                </div>
            </div>
    );
};

export default Todolist;