import React, {ChangeEvent, memo, useCallback} from 'react';
import {Checkbox, IconButton} from "@mui/material";
import EditableSpan from "./EditableSpan";
import {DeleteOutline} from "@mui/icons-material";
import {TaskType} from "./Todolist";

export type TaskPropsType = {
    removeTask: (id: string, todolistID: string) => void
    changeTaskStatus: (taskID: string, isDone: boolean, todolistID: string) => void
    changeTaskTitle: (id: string, title: string, todolistID: string) => void
    task: TaskType
    todolistID: string
}

const Task = memo((props: TaskPropsType) => {

    const removeTask = () => props.removeTask(props.task.id, props.todolistID)
    const onChangeStatus = (e: ChangeEvent<HTMLInputElement>) => props.changeTaskStatus(props.task.id, e.currentTarget.checked, props.todolistID)
    const onChangeTaskTitle = useCallback((title: string) => props.changeTaskTitle(props.task.id, title, props.todolistID), [props.task.id, props.todolistID])

    return (
        <li key={props.task.id} className={props.task.isDone ? "is-done" : ""}>
        <Checkbox checked={props.task.isDone} onChange={onChangeStatus}
                  color={props.task.isDone ? "success" : "info"}/>
        <EditableSpan title={props.task.title} onChange={onChangeTaskTitle}/>
        <IconButton onClick={removeTask}>
            <DeleteOutline fontSize="small" color={props.task.isDone ? "success" : "primary"}/>
        </IconButton>
    </li>
    )
});

export default Task;