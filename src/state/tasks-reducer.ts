import {TasksStateType} from "../App";
import {v1} from "uuid";
import {AddTodolistActionType, RemoveTodolistActionType, todolistId1, todolistId2} from "./todolists-reducer";
import {TaskPriorities, TaskStatuses} from "../api/todolists-api";

export type ActionTypes =
    RemoveTaskActionType | AddTaskActionType |
    ChangeTaskStatusActionType | ChangeTaskTitleActionType |
    AddTodolistActionType | RemoveTodolistActionType

export type RemoveTaskActionType = {
    type: "REMOVE-TASK"
    taskID: string
    todolistID: string
}
export type AddTaskActionType = {
    type: "ADD-TASK"
    title: string
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



const initState: TasksStateType = {}

export const tasksReducer = (state: TasksStateType = initState, action: ActionTypes): TasksStateType => {
    switch (action.type){
        case "REMOVE-TASK": {
            return {...state,
                [action.todolistID]:state[action.todolistID].
                filter(task => task.id !== action.taskID)}
        }
        case "ADD-TASK": {
            return {...state, [action.todolistID]: [{id: v1(), title: action.title, status: TaskStatuses.New, order: 0,
                    addedDate: "",
                    priority: TaskPriorities.Low,
                    startDate: "",
                    deadline: "",
                    completed: false,
                    todoListId: todolistId1,
                    description: "" }, ...state[action.todolistID]]}
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



export const removeTaskAC = (taskID: string, todolistID: string ) : RemoveTaskActionType => {
    return {type: "REMOVE-TASK", taskID: taskID, todolistID: todolistID}
}

export const addTaskAC = (title: string, todolistID: string ) : AddTaskActionType => {
    return {type: "ADD-TASK", title: title, todolistID: todolistID}
}

export const changeTaskStatusAC = (taskID: string, status: TaskStatuses, todolistID: string): ChangeTaskStatusActionType => {
    return {type: "CHANGE-TASK-STATUS", taskID: taskID, status: status, todolistID: todolistID}
}
export const changeTaskTitleAC = (taskID: string, title: string, todolistID:string): ChangeTaskTitleActionType => {
    return {type: "CHANGE-TASK-TITLE", taskID: taskID, title: title, todolistID: todolistID}
}