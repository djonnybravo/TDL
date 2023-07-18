import {Dispatch} from 'redux'
import {SetAppErrorActionType, setAppStatusAC, SetAppStatusActionType, setIsInitializedAC} from "../../App/app-reducer";
import {LoginType} from "./Login";
import {authAPI} from "../../api/auth/authApi";
import {handleServerAppError, handleServerNetworkError} from "../../utils/error-utils";


const initialState = {
    isLoggedIn: false
}
type InitialStateType = typeof initialState

export const authReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'login/SET-IS-LOGGED-IN':
            return {...state, isLoggedIn: action.value}
        default:
            return state
    }
}
// actions
export const setIsLoggedInAC = (value: boolean) =>
    ({type: 'login/SET-IS-LOGGED-IN', value} as const)

// thunks
// export const loginTC = (data: LoginType) => async (dispatch: Dispatch<ActionsType>) => {
//
//     try {
//         dispatch(setAppStatusAC('loading'))
//         const res = await authAPI.login(data)
//         if (res.data.resultCode === 0) {
//             dispatch(setIsLoggedInAC(true))
//             dispatch(setAppStatusAC('success'))
//
//         } else {
//             handleServerAppError(res.data, dispatch)
//         }
//     }
//     catch (e) {
//         const error = e as {message: string}
//         handleServerNetworkError(error, dispatch)
//     }
//
// }

export const loginTC = (data: LoginType) => (dispatch: Dispatch<ActionsType>) => {


    dispatch(setAppStatusAC('loading'))
    authAPI.login(data)
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(setIsLoggedInAC(true))
                dispatch(setAppStatusAC('success'))

            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch(e => {
            const error = e as { message: string }
            handleServerNetworkError(error, dispatch)
        })


}


export const initializeAppTC = () => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC('loading'))
    authAPI.me()
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(setIsLoggedInAC(true));
                dispatch(setAppStatusAC('success'))
                dispatch(setIsInitializedAC(true))
            } else {
                handleServerAppError(res.data, dispatch)
                dispatch(setIsInitializedAC(false))


            }
        })
        .catch(e => {
            const error = e as { message: string }
            handleServerNetworkError(error, dispatch)
            dispatch(setIsInitializedAC(false))

        })
}

// types
type ActionsType = ReturnType<typeof setIsLoggedInAC> | SetAppStatusActionType | SetAppErrorActionType
