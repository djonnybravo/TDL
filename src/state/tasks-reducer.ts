import {TasksStateType} from "../App";
import {
    AddTodolistActionType, RemoveTodolistActionType,
    SetTodolistsActionType,
} from "./todolists-reducer";
import {Dispatch} from "redux";
import {TaskStatuses, TaskType, todolistsAPI} from "../api/todolists-api";

export type ActionTypes =
    RemoveTaskActionType | AddTaskActionType |
    ChangeTaskStatusActionType | ChangeTaskTitleActionType |
    AddTodolistActionType | RemoveTodolistActionType | SetTodolistsActionType | GetTaskForTodolistActionType

export type RemoveTaskActionType = {
    type: "REMOVE-TASK"
    taskID: string
    todolistID: string
}
export type AddTaskActionType = {
    type: "ADD-TASK"
    task: TaskType
    todolistID: string
}

export type ChangeTaskStatusActionType = {
    type: "CHANGE-TASK-STATUS",
    taskID: string,
    status: TaskStatuses,
    todolistID: string
}
export type ChangeTaskTitleActionType = {
    type: "CHANGE-TASK-TITLE",
    taskID: string,
    title: string,
    todolistID: string
}
export type GetTaskForTodolistActionType = {
    type: "GET-TASK-FOR-TODOLIST"
    tasks: TaskType[]
    todolistID: string
}


const initState: TasksStateType = {}

export const tasksReducer = (state: TasksStateType = initState, action: ActionTypes): TasksStateType => {
    switch (action.type){

        case "GET-TASK-FOR-TODOLIST": {
            const stateCopy = {...state}

            stateCopy[action.todolistID] = action.tasks

            return {...state, [action.todolistID]: action.tasks }
        }

        case "SET-TODOLISTS": {

            const stateCopy = {...state}
            action.todolists.forEach((tl) => {
                stateCopy[tl.id] = []
            })
            return stateCopy;
        }
        case "REMOVE-TASK": {
            return {...state,
                [action.todolistID]:state[action.todolistID].
                filter(task => task.id !== action.taskID)}
        }
        case "ADD-TASK": {
            return {...state, [action.todolistID]: [action.task, ...state[action.todolistID]]}
        }
        case "CHANGE-TASK-STATUS": {
            // let tasks = state[action.todolistID]
            // let task = tasks.find(t => t.id === action.taskID)
            // if (task) {
            //     task.isDone = action.isDone
            // }

            return {...state, [action.todolistID]: [...state[action.todolistID].map( t => t.id === action.taskID ? {...t, status: action.status} : t)]}
        }
        case "CHANGE-TASK-TITLE": {
            // let tasks = state[action.todolistID]
            // let task = tasks.find(t => t.id === action.taskID)
            // if (task) {
            //     task.title = action.title
            // }

            return {...state, [action.todolistID]: [...state[action.todolistID].map( t => t.id === action.taskID ? {...t, title: action.title} : t)]}
        }
        case "ADD-TODOLIST": {
            return {...state, [action.todolistID]: []}
        }
        case "REMOVE-TODOLIST": {
            let stateCopy = {...state}
            delete stateCopy[action.todolistID]
            return stateCopy
        }
        default:
            return state
    }
}



export const removeTaskAC = (todolistID: string, taskID: string ) : RemoveTaskActionType => {
    return {type: "REMOVE-TASK", taskID: taskID, todolistID: todolistID}
}

export const addTaskAC = (task: TaskType, todolistID: string ) : AddTaskActionType => {
    return {type: "ADD-TASK",  todolistID: todolistID, task}
}

export const changeTaskStatusAC = (taskID: string, status: TaskStatuses, todolistID: string): ChangeTaskStatusActionType => {
    return {type: "CHANGE-TASK-STATUS", taskID: taskID, status: status, todolistID: todolistID}
}
export const changeTaskTitleAC = (taskID: string, title: string, todolistID:string): ChangeTaskTitleActionType => {
    return {type: "CHANGE-TASK-TITLE", taskID: taskID, title: title, todolistID: todolistID}
}

export const getTaskForTodolistAC = (todolistID: string, tasks: TaskType[]): GetTaskForTodolistActionType => {
    return {type: "GET-TASK-FOR-TODOLIST", todolistID, tasks}
}





export const fetchTasksTC = (todolistID: string) => {
    return (dispatch: Dispatch) => {
        todolistsAPI.getTasks(todolistID)
            .then((res) => {
                dispatch(getTaskForTodolistAC(todolistID, res.data.items))
            })
    }
}

export const removeTaskTC = (todolistID: string, taskID: string) => {

    return (dispatch: Dispatch) => {
        todolistsAPI.deleteTask(todolistID, taskID).then( () => {
            dispatch(removeTaskAC(todolistID, taskID))
            }
        )
    }
}

export const createTaskTC = (todolistID: string, title: string) => {

    return (dispatch: Dispatch) => {
        todolistsAPI.createTask(todolistID, title).then((res) => {
                dispatch(addTaskAC(res.data.data.item, title))
            }
        )
    }
}