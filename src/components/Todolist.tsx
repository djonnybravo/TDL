import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType} from "../App";
import AddItemForm from "./AddItemForm";
import {v1} from "uuid";


type PropsType = {
    todolistID: string
    title: string
    tasks: TaskType[]
    filter: FilterValuesType
    removeTask: (id: string, todolistID: string) => void
    addTask: (title: string, todolistID: string) => void
    changeFilter: (value: FilterValuesType, todolistID: string) => void
    changeTaskStatus: (taskID: string, isDone: boolean, todolistID: string) => void
    removeTodolist: (todolistID: string) => void
}

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}
const Todolist = (props: PropsType) => {


    const onAllFilterClick = () => props.changeFilter('All', props.todolistID)
    const onActiveFilterClick = () => props.changeFilter('Active', props.todolistID)
    const onCompletedFilterClick = () => props.changeFilter('Completed', props.todolistID)
    const removeTodolist = () => props.removeTodolist(props.todolistID)
    const addTask = (title: string) => props.addTask(title, props.todolistID)

    return (
        <div>
            <h3>
                {props.title}---
                <button onClick={removeTodolist}>x</button>
            </h3>

           <AddItemForm addItem={addTask}/>
            <ul>
                {
                    props.tasks.map(task => {
                            const removeTask = () => props.removeTask(task.id, props.todolistID)
                            const onChangeStatus = (e: ChangeEvent<HTMLInputElement>) => props.changeTaskStatus(task.id, e.currentTarget.checked, props.todolistID)
                            return <li key={task.id} className={task.isDone ? "is-done" : ""}>
                                <input type="checkbox" checked={task.isDone} onChange={onChangeStatus}/>
                                <EditableSpan title={task.title}/>
                                <button onClick={removeTask}>x
                                </button>
                            </li>
                        }
                    )}
            </ul>
            <div>
                <button
                    className={props.filter === "All" ? "active-filter" : ""}
                    onClick={onAllFilterClick}>All
                </button>
                <button
                    className={props.filter === "Active" ? "active-filter" : ""}
                    onClick={onActiveFilterClick}>Active
                </button>
                <button
                    className={props.filter === "Completed" ? "active-filter" : ""}
                    onClick={onCompletedFilterClick}>Completed
                </button>
            </div>
        </div>
    );
};
export default Todolist;


type EditableSpanPropsType = {title:string}
const EditableSpan = (props: EditableSpanPropsType) => {
        return <span>{props.title}</span>
}