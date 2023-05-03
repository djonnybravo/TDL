import React from 'react';
import {FilterValuesType} from "./App";


type PropsType = {
    title: string
    tasks: TaskType[]
    removeTask: (id:number) => void
    changeFilter: (value: FilterValuesType) => void
}

type TaskType = {
    id: number
    title: string
    isDone: boolean
}
const Todolist = (props:PropsType) => {
    return (

            <div>
                <h3>{props.title}</h3>
                <div>
                    <input/>
                    <button>+</button>
                </div>
                <ul>
                    {
                        props.tasks.map(task =>

                        <li>
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