import React, {ChangeEvent} from 'react';
import {FilterValuesType} from "../App";
import AddItemForm from "./AddItemForm";
import EditableSpan from './EditableSpan';
import {Button, ButtonGroup, Checkbox, IconButton} from "@mui/material";
import {Delete, DeleteOutline} from "@mui/icons-material";


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
    changeTaskTitle: (id: string, title: string, todolistID: string) => void
    changeTodolistTitle: (title: string, todolistID: string) => void
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
    const onChangeTodolistTitle = (title: string) => props.changeTodolistTitle(title, props.todolistID)


    return (
        <div>
            <h3>
                <EditableSpan title={props.title} onChange={onChangeTodolistTitle}/>
                <IconButton onClick={removeTodolist}>
                    <DeleteOutline/>
                </IconButton>

                {/*<button onClick={removeTodolist}>x</button>*/}
            </h3>

            <AddItemForm addItem={addTask}/>
            <ul>
                {
                    props.tasks.map(task => {

                            const removeTask = () => props.removeTask(task.id, props.todolistID)
                            const onChangeStatus = (e: ChangeEvent<HTMLInputElement>) => props.changeTaskStatus(task.id, e.currentTarget.checked, props.todolistID)
                            const onChangeTaskTitle = (title: string) => props.changeTaskTitle(task.id, title, props.todolistID)

                            return <li key={task.id} className={task.isDone ? "is-done" : ""}>
                                <Checkbox checked={task.isDone} onChange={onChangeStatus}
                                          color={task.isDone ? "success" : "info"}/>
                                <EditableSpan title={task.title} onChange={onChangeTaskTitle}/>
                                <IconButton onClick={removeTask}>
                                    <DeleteOutline fontSize="small" color={task.isDone ? "success" : "primary"}/>
                                </IconButton>
                            </li>
                        }
                    )}
            </ul>
            <div>
                <Button
                    onClick={onAllFilterClick}
                    variant={props.filter === "All" ? "contained" : "outlined"}
                    color={props.filter === "All" ? "secondary" : "primary"}

                >All</Button>
                <Button onClick={onActiveFilterClick}
                        variant={props.filter === "Active" ? "contained" : "outlined"}
                        color={props.filter === "Active" ? "info" : "primary"}
                >Active
                </Button>
                <Button onClick={onCompletedFilterClick}
                        variant={props.filter === "Completed" ? "contained" : "outlined"}
                        color={props.filter === "Completed" ? "success" : "primary"}
                >Completed
                </Button>

            </div>
        </div>
    );
};
export default Todolist;

