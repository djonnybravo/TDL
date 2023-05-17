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
            let newTodolist: TodolistsType = {id: v1(), title: action.title, filter: 'All'}
            return [...state, newTodolist]

        case 'CHANGE-TODOLIST-TITLE':
            let changedTodolist = state.find(tl => tl.id === action.id)
            let newState = [...state]
            if (changedTodolist) {
                changedTodolist.title = action.title
                newState = [...state, changedTodolist]
            }
            return newState


        default:
            throw new Error('I don\'t understand this type')
    }
}