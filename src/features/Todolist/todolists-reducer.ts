import {todolistsAPI, TodolistType} from "../../api/todolists-api";
import {Dispatch} from "redux";
import {
    AppActionsTypes,
    RequestStatusType,
    setAppErrorAC,
    SetAppErrorActionType,
    setAppStatusAC,
    SetAppStatusActionType
} from "../../App/app-reducer";
import {handleServerNetworkError} from "../../utils/error-utils";


export const todolistsReducer = (state: Array<TodolistDomainType> = [], action: ActionsType): Array<TodolistDomainType> => {
    switch (action.type) {

        case 'SET-TODOLISTS':

            return action.todolists.map(tl => ({...tl, filter: 'All', entityStatus: "idle"}))

        case 'REMOVE-TODOLIST' :

            return state.filter(tl => tl.id !== action.todolistID)

        case 'ADD-TODOLIST':

            return [{...action.newTodolist, filter: "All", entityStatus: "idle"}, ...state]

        case 'CHANGE-TODOLIST-TITLE':

            return state.map(tl => tl.id === action.todolistId ? {...tl, title: action.title} : tl)


        case 'CHANGE-TODOLIST-FILTER':

            return state.map(tl => tl.id === action.todolistId ? {...tl, filter: action.filter} : tl)
        case 'SET-ENTITY-STATUS':
            return state.map(tl => tl.id === action.todolistID ? {...tl, entityStatus: action.status} : tl)

        default:

            return state
    }
}

//ACTION CREATORS
export const RemoveTodolistAC = (todolistId: string) => ({type: 'REMOVE-TODOLIST', todolistID: todolistId} as const)
export const AddTodolistAC = (newTodolist: TodolistType) => ({type: 'ADD-TODOLIST', newTodolist} as const)
export const ChangeTodolistTitleAC = (todolistId: string, title: string) => ({
    type: 'CHANGE-TODOLIST-TITLE',
    todolistId,
    title
} as const)
export const ChangeTodolistFilterAC = (todolistId: string, filter: FilterValuesType) => ({
    type: 'CHANGE-TODOLIST-FILTER',
    todolistId,
    filter
} as const)
export const setTodolistsAC = (todolists: Array<TodolistType>) => ({type: 'SET-TODOLISTS', todolists} as const)
export const setEntityStatusAC = (todolistID: string, status: RequestStatusType) => ({type: 'SET-ENTITY-STATUS', todolistID, status} as const)

//THUNK CREATORS
export const fetchTodolistsTC = () => {
    return (dispatch: ThunkDispatch) => {
        dispatch(setAppStatusAC('loading'))
        todolistsAPI.getTodolists()
            .then((res) => {
                dispatch(setTodolistsAC(res.data))
                dispatch(setAppStatusAC('success'))
            })
            .catch((e) => {
                handleServerNetworkError(e.message, dispatch)

            })
    }
}
export const createTodolistTC = (title: string) => {
    return (dispatch: ThunkDispatch) => {
        dispatch(setAppStatusAC('loading'))
        todolistsAPI.createTodolist(title)
            .then((res) => {
                dispatch(AddTodolistAC(res.data.data.item))
                dispatch(setAppStatusAC('success'))
            })
            .catch((e) => {
                handleServerNetworkError(e.message, dispatch)

            })
    }
}
export const removeTodolistTC = (todolistID: string) => {
    return (dispatch:ThunkDispatch) => {
        dispatch(setAppStatusAC('loading'))
        dispatch(setEntityStatusAC(todolistID, 'loading'))
        todolistsAPI.deleteTodolist(todolistID)
            .then((res) => {
                dispatch(RemoveTodolistAC(todolistID))
                dispatch(setAppStatusAC('success'))

            })
            .catch((e) => {
                handleServerNetworkError(e.message, dispatch)

            })
    }
}
export const changeTodolistTitleTC = (todolistID: string, title: string) => {
    return (dispatch: ThunkDispatch) => {
        dispatch(setAppStatusAC('loading'))
        dispatch(setEntityStatusAC(todolistID, 'loading'))

        todolistsAPI.updateTodolist(todolistID, title)
            .then((res) => {
                dispatch(ChangeTodolistTitleAC(todolistID, title))
                dispatch(setAppStatusAC('success'))
                dispatch(setEntityStatusAC(todolistID, 'idle'))

            })
            .catch((e) => {
                handleServerNetworkError(e.message, dispatch)

            })
    }
}


//types
type ActionsType =
    | ReturnType<typeof RemoveTodolistAC>
    | ReturnType<typeof setTodolistsAC>
    | ReturnType<typeof AddTodolistAC>
    | ReturnType<typeof ChangeTodolistTitleAC>
    | ReturnType<typeof ChangeTodolistFilterAC>
    | ReturnType<typeof setEntityStatusAC>
    | SetAppStatusActionType
    | SetAppErrorActionType
export type FilterValuesType = 'All' | 'Completed' | 'Active'

export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType
    entityStatus: RequestStatusType
}
export type AddTodolistActionType = ReturnType<typeof RemoveTodolistAC>
export type RemoveTodolistActionType = ReturnType<typeof AddTodolistAC>
export type SetTodolistsActionType = ReturnType<typeof setTodolistsAC>
type ThunkDispatch = Dispatch<ActionsType | AppActionsTypes>


