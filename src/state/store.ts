import {tasksReducer} from "./tasks-reducer";
import {combineReducers, createStore} from "redux";
import {todolistsReducer} from "./todolists-reducer";


export type AppRootStateType = ReturnType<typeof rootReducer>

const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistsReducer
})


export const store = createStore(rootReducer)
// @ts-ignore
window.store = store