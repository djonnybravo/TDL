import {v1} from "uuid";
import {TodolistType} from "../api/todolists-api";


type ActionsType = RemoveTodolistActionType | AddTodolistActionType | ChangeTodolistFilterActionType | ChangeTodolistTitleActionType | SetTodolistsActionType
export type RemoveTodolistActionType = {
    type: 'REMOVE-TODOLIST'
    todolistID: string
}
export type AddTodolistActionType = {
    type: 'ADD-TODOLIST'
    title: string
    todolistID: string
}
export type ChangeTodolistTitleActionType = {
    type: 'CHANGE-TODOLIST-TITLE'
    id: string
    title: string
}
export type ChangeTodolistFilterActionType = {
    type: 'CHANGE-TODOLIST-FILTER'
    id: string
    filter: FilterValuesType
}
export type SetTodolistsActionType = {
    type: 'SET-TODOLISTS'
    todolists: Array<TodolistType>
}


export type FilterValuesType = 'All' | 'Completed' | 'Active'






export const todolistId1 = v1()
export const todolistId2 = v1()


export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType
}


const initState: Array<TodolistDomainType> = []


export const todolistsReducer = (state: Array<TodolistDomainType> = initState, action: ActionsType): Array<TodolistDomainType> => {
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
            return [ {id: action.todolistID, title: action.title, filter: 'All', addedDate: "", order: 0}, ...state]

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

export const RemoveTodolistAC = (todolistId: string): RemoveTodolistActionType => {
    return {type: 'REMOVE-TODOLIST', todolistID: todolistId}
}
export const AddTodolistAC = (title: string, ): AddTodolistActionType => {
    return {type: 'ADD-TODOLIST', title: title, todolistID: v1()}
}
export const ChangeTitleTodolistAC = (todolistId: string, title: string): ChangeTodolistTitleActionType => {
    return {type: 'CHANGE-TODOLIST-TITLE', id: todolistId, title: title}
}
export const ChangeFilterTodolistAC = (todolistId: string, filter: FilterValuesType): ChangeTodolistFilterActionType => {
    return {type: 'CHANGE-TODOLIST-FILTER', id: todolistId, filter: filter}
}

export const setTodolistsAC = (todolists: Array<TodolistType>): SetTodolistsActionType => {
    return {type: 'SET-TODOLISTS', todolists}
}