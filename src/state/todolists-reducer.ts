import {FilterValuesType, TodolistsType} from "../App";
import {v1} from "uuid";


type ActionsType = RemoveTodolistActionType | AddTodolistActionType | ChangeTodolistFilterActionType | ChangeTodolistTitleActionType
export type RemoveTodolistActionType = {
    type: 'REMOVE-TODOLIST'
    id: string
}

export type AddTodolistActionType = {
    type: 'ADD-TODOLIST'
    title: string
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


export const todolistsReducer = (state: Array<TodolistsType>, action: ActionsType): Array<TodolistsType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST' :

            return state.filter(tl => tl.id !== action.id)

        case 'ADD-TODOLIST':
            return [...state, {id: v1(), title: action.title, filter: 'All'}]

        case 'CHANGE-TODOLIST-TITLE':{
            let changedTodolist = state.find(tl => tl.id === action.id)

            if (changedTodolist) {
                changedTodolist.title = action.title

            }
            return [...state]
        }

        case 'CHANGE-TODOLIST-FILTER': {
            let changedTodolist = state.find(tl => tl.id === action.id)

            if (changedTodolist) {
                changedTodolist.filter = action.filter

            }
            return [...state]
        }

        default:
            throw new Error('I don\'t understand this type')
    }
}

export const RemoveTodolistAC = (todolistId: string): RemoveTodolistActionType => {
    return {type: 'REMOVE-TODOLIST', id: todolistId}
}
export const AddTodolistAC = (title: string): AddTodolistActionType => {
    return {type: 'ADD-TODOLIST', title: title}
}
export const ChangeTitleTodolistAC = (todolistId: string, title: string): ChangeTodolistTitleActionType => {
    return {type: 'CHANGE-TODOLIST-TITLE', id: todolistId, title: title}
}
export const ChangeFilterTodolistAC = (todolistId: string, filter: FilterValuesType): ChangeTodolistFilterActionType => {
    return {type: 'CHANGE-TODOLIST-FILTER', id: todolistId, filter: filter}
}
