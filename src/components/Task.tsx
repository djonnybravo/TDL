import React, {ChangeEvent, memo, useCallback} from 'react';
import {Checkbox, IconButton} from "@mui/material";
import EditableSpan from "./EditableSpan";
import {DeleteOutline} from "@mui/icons-material";

import {TaskStatuses, TaskType} from "../api/todolists-api";

export type TaskPropsType = {
    removeTask: (id: string, todolistID: string) => void
    changeTaskStatus: (taskID: string, status: TaskStatuses, todolistID: string) => void
    changeTaskTitle: (id: string, title: string, todolistID: string) => void
    task: TaskType
    todolistID: string
}

const Task = memo((props: TaskPropsType) => {

    const removeTask = () => props.removeTask(props.task.id, props.todolistID)
    const onChangeStatus = (e: ChangeEvent<HTMLInputElement>) => {
        let newIsDoneValue = e.currentTarget.checked
        props.changeTaskStatus(props.task.id, newIsDoneValue ? TaskStatuses.Completed : TaskStatuses.New, props.todolistID)
    }
    const onChangeTaskTitle = useCallback((title: string) => props.changeTaskTitle(props.task.id, title, props.todolistID), [props.task.id, props.todolistID])

    return (
        <div key={props.task.id} className={props.task.status === TaskStatuses.Completed ? "is-done" : ""}>
        <Checkbox checked={props.task.status === TaskStatuses.Completed} onChange={onChangeStatus}
                  color={props.task.status === TaskStatuses.Completed ? "success" : "info"}/>
        <EditableSpan title={props.task.title} onChange={onChangeTaskTitle}/>
        <IconButton onClick={removeTask}>
            <DeleteOutline fontSize="small" color={props.task.status === TaskStatuses.Completed ? "success" : "primary"}/>
        </IconButton>
    </div>
    )
});

export default Task;