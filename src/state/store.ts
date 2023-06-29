import {tasksReducer} from "./tasks-reducer";
import {AnyAction, applyMiddleware, combineReducers, createStore, legacy_createStore} from "redux";
import {todolistsReducer} from "./todolists-reducer";
import thunk, {ThunkDispatch} from "redux-thunk";
import {useDispatch} from "react-redux";


export type AppRootStateType = ReturnType<typeof rootReducer>
type ThunkDispatchType = ThunkDispatch<AppRootStateType, any, AnyAction>
export const useAppDispatch = () =>  useDispatch<ThunkDispatchType>();

const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistsReducer
})


export const store = legacy_createStore(rootReducer, applyMiddleware(thunk))
// @ts-ignore
window.store = store