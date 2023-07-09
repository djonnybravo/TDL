import {todolistsAPI, TodolistType} from "../../api/todolists-api";
import {Dispatch} from "redux";
import {setStatusAC} from "../../App/app-reducer";


export const todolistsReducer = (state: Array<TodolistDomainType> = [], action: ActionsType): Array<TodolistDomainType> => {
    switch (action.type) {

        case 'SET-TODOLISTS':

            return action.todolists.map(tl => ({...tl, filter: 'All'}))

        case 'REMOVE-TODOLIST' :

            return state.filter(tl => tl.id !== action.todolistID)

        case 'ADD-TODOLIST':

            return [{...action.newTodolist, filter: "All"}, ...state]

        case 'CHANGE-TODOLIST-TITLE':

            return state.map(tl => tl.id === action.todolistId ? {...tl, title: action.title} : tl)


        case 'CHANGE-TODOLIST-FILTER':

            return state.map(tl => tl.id === action.todolistId ? {...tl, filter: action.filter} : tl)

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


//THUNK CREATORS
export const fetchTodolistsTC = () => {
    return (dispatch: Dispatch) => {
        dispatch(setStatusAC('loading'))
        todolistsAPI.getTodolists()
            .then((res) => {
                dispatch(setTodolistsAC(res.data))
                dispatch(setStatusAC('idle'))
            })
    }
}
export const createTodolistTC = (title: string) => {
    return (dispatch: Dispatch<ActionsType>) => {
        todolistsAPI.createTodolist(title)
            .then((res) => {
                dispatch(AddTodolistAC(res.data.data.item))
            })
    }
}
export const removeTodolistTC = (todolistID: string) => {
    return (dispatch: Dispatch<ActionsType>) => {
        todolistsAPI.deleteTodolist(todolistID)
            .then((res) => {
                dispatch(RemoveTodolistAC(todolistID))
            })
    }
}
export const changeTodolistTitleTC = (todolistID: string, title: string) => {
    return (dispatch: Dispatch<ActionsType>) => {
        todolistsAPI.updateTodolist(todolistID, title)
            .then((res) => {
                dispatch(ChangeTodolistTitleAC(todolistID, title))
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

export type FilterValuesType = 'All' | 'Completed' | 'Active'

export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType
}
export type AddTodolistActionType = ReturnType<typeof RemoveTodolistAC>
export type RemoveTodolistActionType = ReturnType<typeof AddTodolistAC>
export type SetTodolistsActionType = ReturnType<typeof setTodolistsAC>



