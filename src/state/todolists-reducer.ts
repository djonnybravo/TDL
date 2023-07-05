import {todolistsAPI, TodolistType} from "../api/todolists-api";
import {Dispatch} from "redux";


export const todolistsReducer = (state: Array<TodolistDomainType> = [], action: ActionsType): Array<TodolistDomainType> => {
    switch (action.type) {

         case 'SET-TODOLISTS': {
             return action.todolists.map(tl => ({
                 ...tl,
                 filter: 'All'
             }))
        }
        case 'REMOVE-TODOLIST' :

            return state.filter(tl => tl.id !== action.todolistID)

        case 'ADD-TODOLIST':
            return [ {...action.newTodolist, filter: "All"}, ...state]

        case 'CHANGE-TODOLIST-TITLE':{
            let changedTodolist = state.find(tl => tl.id === action.id)

            if (changedTodolist) {
                changedTodolist.title = action.title

            }
             return [...state]
            // return state.map(tl => tl.id === action.id ? {...tl, title: action.title} : tl)
        }

        case 'CHANGE-TODOLIST-FILTER': {
            let changedTodolist = state.find(tl => tl.id === action.id)

            if (changedTodolist) {
                changedTodolist.filter = action.filter

            }
            return [...state]
            //  return state.map(tl => tl.id === action.id ? {...tl, filter: action.filter} : tl)
        }

        default:
            return state
    }
}

//ACTION CREATORS
export const RemoveTodolistAC = (todolistId: string) => ({type: 'REMOVE-TODOLIST', todolistID: todolistId}) as const
export const AddTodolistAC = ( newTodolist: TodolistType) => ({type: 'ADD-TODOLIST', newTodolist}) as const
export const ChangeTitleTodolistAC = (todolistId: string, title: string) =>  ({type: 'CHANGE-TODOLIST-TITLE', id: todolistId, title: title}) as const
export const ChangeFilterTodolistAC = (todolistId: string, filter: FilterValuesType) => ({type: 'CHANGE-TODOLIST-FILTER', id: todolistId, filter: filter}) as const
export const setTodolistsAC = (todolists: Array<TodolistType>) => ({type: 'SET-TODOLISTS', todolists}) as const




//THUNK CREATORS
export const fetchTodolistsTC = () => {
    return (dispatch: Dispatch) => {
        todolistsAPI.getTodolists()
            .then((res) => {
                dispatch(setTodolistsAC(res.data))
            })
    }
}
export const createTodolistTC = (title: string) => {
    return (dispatch: Dispatch) => {
        todolistsAPI.createTodolist(title)
            .then((res) => {
                dispatch(AddTodolistAC(res.data.data.item))
            })
    }
}
export const removeTodolistTC = (todolistID: string) => {
    return (dispatch: Dispatch) => {
        todolistsAPI.deleteTodolist(todolistID)
            .then((res) => {
                dispatch(RemoveTodolistAC(todolistID))
            })
    }
}
export const changeTodolistTitleTC = (todolistID: string, title: string) => {
    return (dispatch: Dispatch) => {
        todolistsAPI.updateTodolist(todolistID, title)
            .then((res) => {
                dispatch(ChangeTitleTodolistAC(todolistID, title))
            })
    }
}


//types
type ActionsType =
    | ReturnType<typeof RemoveTodolistAC>
    | ReturnType<typeof setTodolistsAC>
    | ReturnType<typeof AddTodolistAC>
    | ReturnType<typeof ChangeTitleTodolistAC>
    | ReturnType<typeof ChangeFilterTodolistAC>

export type FilterValuesType = 'All' | 'Completed' | 'Active'

export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType
}
