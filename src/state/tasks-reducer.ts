import {TasksStateType} from "../App";
import {v1} from "uuid";

export type ActionTypes = RemoveTaskActionType | AddTaskActionType | ChangeTaskStatusActionType

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
    isDone: boolean,
    todolistID: string
}

export const tasksReducer = (state: TasksStateType, action: ActionTypes) => {
    switch (action.type){
        case "REMOVE-TASK": {
            return {...state,
                [action.todolistID]:state[action.todolistID].
                filter(task => task.id !== action.taskID)}
        }
        case "ADD-TASK": {
            return {...state, [action.todolistID]: [{id: v1(), title: action.title, isDone: false}, ...state[action.todolistID]]}
        }
        case "CHANGE-TASK-STATUS": {
            let tasks = state[action.todolistID]
            let task = tasks.find(t => t.id === action.taskID)
            if (task) {
                task.isDone = action.isDone
            }

            return {...state, [action.todolistID]: tasks}
        }
        default:
            throw new Error('I dont understand this type')
    }
}



export const removeTaskAC = (taskID: string, todolistID: string ) : RemoveTaskActionType => {
    return {type: "REMOVE-TASK", taskID: taskID, todolistID: todolistID}
}

export const addTaskAC = (title: string, todolistID: string ) : AddTaskActionType => {
    return {type: "ADD-TASK", title: title, todolistID: todolistID}
}

export const changeTaskStatusAC = (taskID: string, isDone: boolean, todolistID: string): ChangeTaskStatusActionType => {
    return {type: "CHANGE-TASK-STATUS", taskID: taskID, isDone: isDone, todolistID: todolistID}
}