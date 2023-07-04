import {TasksStateType} from "../App";
import {AddTodolistAC, TodolistDomainType, todolistsReducer} from "./todolists-reducer";

import {tasksReducer} from "./tasks-reducer";

test('ids should be equals', () => {
    const startTasksState: TasksStateType = {}
    const startTodolistsState: Array<TodolistDomainType> = []

    const action = AddTodolistAC({id: "id", order: 0, addedDate: "", title: "TDL Title"})

    const endTasksState = tasksReducer(startTasksState, action)
    const endTodolistsState = todolistsReducer(startTodolistsState, action)

    const keys = Object.keys(endTasksState)
    const idFromTasks = keys[0]
    const idFromTodolists = endTodolistsState[0].id

    expect(idFromTasks).toBe(action.newTodolist.id)
    expect(idFromTodolists).toBe(action.newTodolist.id)
})
