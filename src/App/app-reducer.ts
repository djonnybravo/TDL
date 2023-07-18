




export const AppReducer = (state: initialStateType = initialState, action: AppActionsTypes): initialStateType => {

    switch (action.type) {

        case "APP/SET-STATUS":
            return {...state, status: action.status}
        case "APP/SET-ERROR":
            return {...state, error: action.error}
        case "APP/SET-INITIALIZED" :
            return {...state, isInitialized: action.isInitialized}

        default: return state
    }


}


const initialState: initialStateType = {
    status: "loading",
    error: null,
    isInitialized: false
}
type initialStateType = {
    status: RequestStatusType
    error: string | null
    isInitialized: boolean
}
export type RequestStatusType = 'idle' | 'loading' | 'success' | 'failed'
export type AppActionsTypes = SetAppErrorActionType |SetAppStatusActionType | ReturnType<typeof setIsInitializedAC>
export type SetAppStatusActionType =  ReturnType<typeof setAppStatusAC>
export type SetAppErrorActionType =  ReturnType<typeof setAppErrorAC>
export const setAppStatusAC = (status: RequestStatusType) => ({type: "APP/SET-STATUS", status} as const)
export const setAppErrorAC = (error: string | null) => ({type: "APP/SET-ERROR", error} as const)
export const setIsInitializedAC = (isInitialized: boolean) => ({type: "APP/SET-INITIALIZED", isInitialized} as const)