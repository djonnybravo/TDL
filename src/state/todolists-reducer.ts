import {TodolistsType} from "../App";
import {v1} from "uuid";


type ActionType = {
    type: string
    [key: string]: any
}

export const todolistsReducer = (state: Array<TodolistsType>, action: ActionType): Array<TodolistsType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST' :

            return state.filter(tl => tl.id !== action.id)

        case 'ADD-TODOLIST':
            return [...state, {id: v1(), title: action.title, filter: 'All'}]

        case 'CHANGE-TODOLIST-TITLE':{
            let changedTodolist = state.find(tl => tl.id === action.id)
            let newState = [...state]
            if (changedTodolist) {
                changedTodolist.title = action.title
                newState = [...state, changedTodolist]
            }
            return newState
        }

        case 'CHANGE-TODOLIST-FILTER': {
            let changedTodolist = state.find(tl => tl.id === action.id)
            let newState = [...state]
            if (changedTodolist) {
                changedTodolist.filter = action.filter
                newState = [...state, changedTodolist]
            }
            return newState
        }
        default:
            throw new Error('I don\'t understand this type')
    }
}