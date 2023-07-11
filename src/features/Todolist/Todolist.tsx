import React, {memo, useCallback, useEffect} from 'react';
import AddItemForm from "../../components/UI/AddItemForm/AddItemForm";
import EditableSpan from '../../components/UI/EditableSpan/EditableSpan';
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Paper from "@mui/material/Paper";
import {DeleteOutline} from "@mui/icons-material";
import Task from "./Task/Task";
import {FilterValuesType} from "./todolists-reducer";
import {TaskStatuses, TaskType} from "../../api/todolists-api";
import {useAppDispatch} from "../../App/store";
import {fetchTasksTC} from "./Task/tasks-reducer";
import {RequestStatusType} from "../../App/app-reducer";


type PropsType = {
    entityStatus: RequestStatusType
    todolistID: string
    tasks: TaskType[]
    title: string
    filter: FilterValuesType
    addTask: (title: string, todolistID: string) => void
    removeTask: (id: string, todolistID: string) => void
    changeTaskStatus: (taskID: string, status: TaskStatuses, todolistID: string) => void
    changeTaskTitle: (id: string, title: string, todolistID: string) => void
    changeTodolistTitle: (title: string, todolistID: string) => void
    removeTodolist: (todolistID: string) => void
    changeFilter: (value: FilterValuesType, todolistID: string) => void
}


const Todolist = memo((props: PropsType) => {
    console.log("todolist render")
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(fetchTasksTC(props.todolistID))
    }, [])


    const onAllFilterClick = () => props.changeFilter('All', props.todolistID)
    const onActiveFilterClick = () => props.changeFilter('Active', props.todolistID)
    const onCompletedFilterClick = () => props.changeFilter('Completed', props.todolistID)
    const removeTodolist = () => props.removeTodolist(props.todolistID)
    const addTask = useCallback((title: string) => props.addTask(title, props.todolistID), [props.addTask, props.todolistID])
    const onChangeTodolistTitle = useCallback((title: string) => props.changeTodolistTitle(title, props.todolistID), [props.todolistID, props.title])

    let tasksForTodolist: Array<TaskType> = props.tasks


    if (props.filter === "Completed") {
        tasksForTodolist = props.tasks.filter(t => t.status === TaskStatuses.Completed)
    }
    if (props.filter === "Active") {
        tasksForTodolist = props.tasks.filter(t => t.status === TaskStatuses.New)
    }


    return (
        <Paper elevation={8} style={{padding: '20px'}}>
            <h3>
                <EditableSpan title={props.title} onChange={onChangeTodolistTitle}/>
                <IconButton onClick={removeTodolist} disabled={props.entityStatus === 'loading'}>
                    <DeleteOutline/>
                </IconButton>

            </h3>

            <AddItemForm addItem={addTask} disabled={props.entityStatus === "loading"}/>
            <div>
                {
                    tasksForTodolist.map(task =>

                        <Task removeTask={props.removeTask} changeTaskStatus={props.changeTaskStatus}
                              changeTaskTitle={props.changeTaskTitle} task={task} todolistID={props.todolistID}
                              key={task.id} />
                    )}

            </div>
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
        </Paper>
    );
});
export default Todolist;

