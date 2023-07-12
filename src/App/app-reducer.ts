




export const AppReducer = (state: initialStateType = initialState, action: AppActionsTypes): initialStateType => {

    switch (action.type) {

        case "APP/SET-STATUS":
            return {...state, status: action.status}
        case "APP/SET-ERROR":
            return {...state, error: action.error}

        default: return state
    }


}


const initialState: initialStateType = {
    status: "loading",
    error: null
}
type initialStateType = {
    status: RequestStatusType
    error: string | null
}
export type RequestStatusType = 'idle' | 'loading' | 'success' | 'failed'
export type AppActionsTypes = SetAppErrorActionType |SetAppStatusActionType
export type SetAppStatusActionType =  ReturnType<typeof setAppStatusAC>
export type SetAppErrorActionType =  ReturnType<typeof setAppErrorAC>
export const setAppStatusAC = (status: RequestStatusType) => ({type: "APP/SET-STATUS", status} as const)
export const setAppErrorAC = (error: string | null) => ({type: "APP/SET-ERROR", error} as const)