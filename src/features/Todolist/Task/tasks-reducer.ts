
import {
    AddTodolistActionType, RemoveTodolistActionType,
    SetTodolistsActionType,
} from "../todolists-reducer";
import {Dispatch} from "redux";
import {TaskPriorities, TaskStatuses, TaskType, todolistsAPI, UpdateTaskModelType} from "../../../api/todolists-api";
import {AppRootStateType} from "../../../App/store";
import {AppActionsTypes, setErrorAC, setStatusAC} from "../../../App/app-reducer";


export const tasksReducer = (state: TasksStateType = initState, action: ActionsType): TasksStateType => {
    switch (action.type){

        case "SET-TASKS": {
              return {...state, [action.todolistID]: action.tasks }
        }

        case "REMOVE-TASK": {
            return {...state,
                [action.todolistID]:state[action.todolistID].
                filter(task => task.id !== action.taskID)}
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
export const setTasksAC = ( todolistID: string, tasks: Array<TaskType>,) =>
    ({type: 'SET-TASKS', tasks, todolistID} as const)


//THUNKS
export const fetchTasksTC = (todolistID: string) => {

    return (dispatch: ThunkDispatch) => {
        dispatch(setStatusAC('loading'))
        todolistsAPI.getTasks(todolistID)
            .then((res) => {
                dispatch(setTasksAC(todolistID, res.data.items))
                dispatch(setStatusAC('success'))

            })
    }
}

export const removeTaskTC = (todolistID: string, taskID: string) => {

    return (dispatch: ThunkDispatch) => {
        todolistsAPI.deleteTask(todolistID, taskID)
            .then( (res) => {
            dispatch(removeTaskAC(todolistID, taskID))
            }
        )
    }
}

export const createTaskTC = (todolistID: string, title: string) => {

    return (dispatch: ThunkDispatch) => {
        dispatch(setStatusAC('loading'))
        todolistsAPI.createTask(todolistID, title)
            .then((res) => {
                if (res.data.resultCode === 0) {
                    dispatch(addTaskAC(res.data.data.item))
                    dispatch(setStatusAC('success'))
                }else {
                    dispatch(setErrorAC(res.data.messages[0]))
                    dispatch(setStatusAC('failed'))

                }
            }

        )
    }
}

export const updateTaskTC = (taskID: string, domainModel: UpdateDomainTaskModelType, todolistID: string) =>

    (dispatch: ThunkDispatch, getState: () => AppRootStateType) => {

        dispatch(setStatusAC('loading'))
        const state = getState()
        const task = state.tasks[todolistID].find(t => t.id === taskID)
        if (!task) {
            //throw new Error("task not found in the state");
            console.warn('task not found in the state')
            dispatch(setErrorAC('task not found in the state'))
            dispatch(setStatusAC('failed'))
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

        todolistsAPI.updateTask(todolistID, taskID, apiModel )
            .then(res => {
                const action = updateTaskAC(taskID, domainModel, todolistID)
                dispatch(action)
                dispatch(setStatusAC('success'))
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