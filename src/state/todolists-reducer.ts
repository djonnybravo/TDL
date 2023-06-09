import {FilterValuesType, TodolistsType} from "../App";
import {v1} from "uuid";


type ActionsType = RemoveTodolistActionType | AddTodolistActionType | ChangeTodolistFilterActionType | ChangeTodolistTitleActionType
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

export const todolistId1 = v1()
export const todolistId2 = v1()

const initState: Array<TodolistsType> = [
    {id: todolistId1, title: "Что выучить:", filter: "All"},
    {id: todolistId2, title: "Что купить:", filter: "Active"}
]


export const todolistsReducer = (state: Array<TodolistsType> = initState, action: ActionsType) => {
    switch (action.type) {
        case 'REMOVE-TODOLIST' :

            return state.filter(tl => tl.id !== action.todolistID)

        case 'ADD-TODOLIST':
            return [...state, {id: action.todolistID, title: action.title, filter: 'All'}]

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
