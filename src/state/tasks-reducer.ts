import {TasksStateType} from "../App";

export type ActionTypes = RemoveTaskActionType

export type RemoveTaskActionType = {
    type: "REMOVE-TASK"
    taskID: string
    todolistID: string
}


export const tasksReducer = (state: TasksStateType, action: ActionTypes) => {
    switch (action.type){

    }
}



export const removeTaskAC = (taskID: string, todolistID: string ) : RemoveTaskActionType => {
    return {type: "REMOVE-TASK", taskID: taskID, todolistID: todolistID}
}