import {
    AddTodolistActionType, RemoveTodolistActionType,
    SetTodolistsActionType,
} from "../todolists-reducer";
import {Dispatch} from "redux";
import {TaskPriorities, TaskStatuses, TaskType, todolistsAPI, UpdateTaskModelType} from "../../../api/todolists-api";
import {AppRootStateType} from "../../../App/store";
import {AppActionsTypes, setAppErrorAC, setAppStatusAC} from "../../../App/app-reducer";
import {handleServerAppError, handleServerNetworkError} from "../../../utils/error-utils";


export const tasksReducer = (state: TasksStateType = initState, action: ActionsType): TasksStateType => {
    switch (action.type) {

        case "SET-TASKS": {
            return {...state, [action.todolistID]: action.tasks}
        }

        case "REMOVE-TASK": {
            return {
                ...state,
                [action.todolistID]: state[action.todolistID].filter(task => task.id !== action.taskID)
            }
        }
        case "ADD-TASK": {
            return {...state, [action.task.todoListId]: [action.task, ...state[action.task.todoListId]]}
        }

        case 'UPDATE-TASK':
            return {
                ...state,
                [action.todolistID]: state[action.todolistID]
                    .map(t => t.id === action.taskID ? {...t, ...action.model} : t)
            }
        case "SET-TODOLISTS": {

            const stateCopy = {...state}
            action.todolists.forEach((tl) => {
                stateCopy[tl.id] = []
            })
            return stateCopy;
        }

        case "ADD-TODOLIST": {
            return {...state, [action.newTodolist.id]: []}
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


//ACTIONS
export const removeTaskAC = (todolistID: string, taskID: string) =>
    ({type: 'REMOVE-TASK', taskID, todolistID} as const)
export const addTaskAC = (task: TaskType) =>
    ({type: 'ADD-TASK', task} as const)
export const updateTaskAC = (taskID: string, model: UpdateDomainTaskModelType, todolistID: string) =>
    ({type: 'UPDATE-TASK', model, todolistID, taskID} as const)
export const setTasksAC = (todolistID: string, tasks: Array<TaskType>,) =>
    ({type: 'SET-TASKS', tasks, todolistID} as const)


//THUNKS
export const fetchTasksTC = (todolistID: string) => {

    return (dispatch: ThunkDispatch) => {
        dispatch(setAppStatusAC('loading'))
        todolistsAPI.getTasks(todolistID)
            .then((res) => {
                dispatch(setTasksAC(todolistID, res.data.items))
                dispatch(setAppStatusAC('success'))

            })
            .catch((e) => {
                handleServerNetworkError(e.message, dispatch)
        })
    }
}

export const removeTaskTC = (todolistID: string, taskID: string) => {

    return (dispatch: ThunkDispatch) => {
        dispatch(setAppStatusAC('loading'))

        todolistsAPI.deleteTask(todolistID, taskID)
            .then((res) => {
                    dispatch(removeTaskAC(todolistID, taskID))
                    dispatch(setAppStatusAC('success'))

                }
            )
            .catch((e) => {
                handleServerNetworkError(e.message, dispatch)

            })
    }
}

export const createTaskTC = (todolistID: string, title: string) => {

    return (dispatch: ThunkDispatch) => {
        dispatch(setAppStatusAC('loading'))
        todolistsAPI.createTask(todolistID, title)
            .then((res) => {
                    if (res.data.resultCode === 0) {
                        dispatch(addTaskAC(res.data.data.item))
                        dispatch(setAppStatusAC('success'))
                    } else {
                        dispatch(setAppErrorAC(res.data.messages[0]))
                        dispatch(setAppStatusAC('failed'))
                        handleServerAppError(res.data, dispatch)
                    }
                }
            )
            .catch((e) => {
                handleServerNetworkError(e.message, dispatch)

            })
    }
}

export const updateTaskTC = (taskID: string, domainModel: UpdateDomainTaskModelType, todolistID: string) =>

    (dispatch: ThunkDispatch, getState: () => AppRootStateType) => {

        dispatch(setAppStatusAC('loading'))
        const state = getState()
        const task = state.tasks[todolistID].find(t => t.id === taskID)
        if (!task) {
            //throw new Error("task not found in the state");
            console.warn('task not found in the state')
            dispatch(setAppErrorAC('task not found in the state'))
            dispatch(setAppStatusAC('failed'))
            return
        }

        const apiModel: UpdateTaskModelType = {
            deadline: task.deadline,
            description: task.description,
            priority: task.priority,
            startDate: task.startDate,
            title: task.title,
            status: task.status,
            ...domainModel
        }

        todolistsAPI.updateTask(todolistID, taskID, apiModel)
            .then(res => {
                if (res.data.resultCode === 0) {
                    const action = updateTaskAC(taskID, domainModel, todolistID)
                    dispatch(action)
                    dispatch(setAppStatusAC('success'))
                } else {
                    if (res.data.messages[0]){
                        dispatch(setAppErrorAC(res.data.messages[0]))
                    }else{
                        dispatch(setAppErrorAC("Произошла ошибка, попробуй еще раз."))
                    }
                    dispatch(setAppStatusAC('failed'))
                }

            })
            .catch((e) => {
                handleServerNetworkError(e.message, dispatch)
            })
    }


// types
export type UpdateDomainTaskModelType = {
    title?: string
    description?: string
    status?: TaskStatuses
    priority?: TaskPriorities
    startDate?: string
    deadline?: string
}
export type TasksStateType = {
    [key: string]: Array<TaskType>
}
type ActionsType =
    | ReturnType<typeof removeTaskAC>
    | ReturnType<typeof addTaskAC>
    | ReturnType<typeof updateTaskAC>
    | AddTodolistActionType
    | RemoveTodolistActionType
    | SetTodolistsActionType
    | ReturnType<typeof setTasksAC>
type ThunkDispatch = Dispatch<ActionsType | AppActionsTypes>
const initState: TasksStateType = {}