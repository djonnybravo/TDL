import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType} from "./App";


type PropsType = {
    todolistID: string
    title: string
    tasks: TaskType[]
    filter: FilterValuesType
    removeTask: (id: string, todolistID: string) => void
    addTask: (title: string, todolistID: string) => void
    changeFilter: (value: FilterValuesType, todolistID: string) => void
    changeTaskStatus: (taskID: string, isDone: boolean, todolistID: string) => void
}

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}
const Todolist = (props: PropsType) => {

    const [newTaskTitle, setNewTaskTitle] = useState(' ')
    const [error, setError] = useState(false)

    const onChangeInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTaskTitle(e.currentTarget.value)
        setError(false)
    }
    const onKeyPressInputHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.charCode == 13) {
            props.addTask(newTaskTitle, props.todolistID);
            setNewTaskTitle('')
            setError(false)
        }
    }
    const addTask = () => {
        if (newTaskTitle.trim() !== "") {
            props.addTask(newTaskTitle, props.todolistID);
            setNewTaskTitle('')

        } else {
            setError(true)
        }
    }
    const onAllFilterClick = () => props.changeFilter('All', props.todolistID)
    const onActiveFilterClick = () => props.changeFilter('Active', props.todolistID)
    const onCompletedFilterClick = () => props.changeFilter('Completed', props.todolistID)

    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input
                    value={newTaskTitle}
                    onChange={onChangeInputHandler}
                    onKeyPress={onKeyPressInputHandler}
                    className={error ? "error" : ""}
                />
                <button onClick={addTask}>+</button>
                {error && <div className="error-message">Field is required and cant be empty!</div>}

            </div>
            <ul>
                {
                    props.tasks.map(task => {
                            const removeTask = () => props.removeTask(task.id, props.todolistID)
                            const onChangeStatus = (e: ChangeEvent<HTMLInputElement>) => props.changeTaskStatus(task.id, e.currentTarget.checked, props.todolistID)
                            return <li key={task.id} className={task.isDone ? "is-done" : ""}>
                                <input type="checkbox" checked={task.isDone} onChange={onChangeStatus}/>
                                <span>{task.title} </span>
                                <button onClick={removeTask}>x
                                </button>
                            </li>
                        }
                    )}
            </ul>
            <div>
                <button className={props.filter === "All" ? "active-filter" : ""} onClick={onAllFilterClick}>All</button>
                <button className={props.filter === "Active" ? "active-filter" : ""} onClick={onActiveFilterClick}>Active</button>
                <button className={props.filter === "Completed" ? "active-filter" : ""} onClick={onCompletedFilterClick}>Completed</button>
            </div>
        </div>
    );
};
export default Todolist;