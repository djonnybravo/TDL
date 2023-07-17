import {tasksReducer} from "../features/Todolist/Task/tasks-reducer";
import {AnyAction, applyMiddleware, combineReducers, createStore, legacy_createStore} from "redux";
import {todolistsReducer} from "../features/Todolist/todolists-reducer";
import thunk, {ThunkDispatch} from "redux-thunk";
import {useDispatch} from "react-redux";
import {AppReducer} from "./app-reducer";
import {authReducer} from "../features/Login/auth-reducer";


export type AppRootStateType = ReturnType<typeof rootReducer>
type ThunkDispatchType = ThunkDispatch<AppRootStateType, any, AnyAction>
export const useAppDispatch = () =>  useDispatch<ThunkDispatchType>();

const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistsReducer,
    app: AppReducer,
    auth: authReducer
})


export const store = legacy_createStore(rootReducer, applyMiddleware(thunk))
// @ts-ignore
window.store = store