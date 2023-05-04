import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType} from "./App";


type PropsType = {
    title: string
    tasks: TaskType[]
    removeTask: (id: string) => void
    addTask: (title: string) => void
    changeFilter: (value: FilterValuesType) => void
}

type TaskType = {
    id: string
    title: string
    isDone: boolean
}
const Todolist = (props: PropsType) => {

    const [newTaskTitle, setNewTaskTitle] = useState(' ')


    const onChangeInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTaskTitle(e.currentTarget.value)
    }
    const onKeyPressInputHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.charCode == 13) {
            props.addTask(newTaskTitle);
            setNewTaskTitle('')
        }
    }
    const addTask = () => {
        props.addTask(newTaskTitle);
        setNewTaskTitle('')
    }
    const onAllFilterClick = () => props.changeFilter('All')
    const onActiveFilterClick = () => props.changeFilter('Active')
    const onCompletedFilterClick = () => props.changeFilter('Completed')

    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input
                    value={newTaskTitle}
                    onChange={onChangeInputHandler}
                    onKeyPress={onKeyPressInputHandler}
                />
                <button onClick={addTask}>+</button>
            </div>
            <ul>
                {
                    props.tasks.map(task => {
                            const removeTask = () => props.removeTask(task.id)
                            return <li key={task.id}>
                                <input type="checkbox" checked={task.isDone}/>
                                <span>{task.title} </span>
                                <button onClick={removeTask}>x
                                </button>
                            </li>
                        }
                    )}
            </ul>
            <div>
                <button onClick={onAllFilterClick}>All</button>
                <button onClick={onActiveFilterClick}>Active</button>
                <button onClick={onCompletedFilterClick}>Completed</button>
            </div>
        </div>
    );
};
export default Todolist;