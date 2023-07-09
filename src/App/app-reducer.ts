




export const AppReducer = (state: initialStateType = initialState, action: ActionsTypes): initialStateType => {

    switch (action.type) {

        case "APP/SET-STATUS":
            return {...state, status: action.status}
        case "APP/SET-ERROR":
            return {...state, error: action.error}

        default: return state
    }


}


const initialState: initialStateType = {
    status: "idle",
    error: "ERER"
}
type initialStateType = {
    status: RequestStatusType
    error: string | null
}
type RequestStatusType = 'idle' | 'loading' | 'success' | 'failed'
type ActionsTypes = ReturnType<typeof setErrorAC> | ReturnType<typeof setStatusAC>

export const setStatusAC = (status: RequestStatusType) => ({type: "APP/SET-STATUS", status} as const)
export const setErrorAC = (error: string | null) => ({type: "APP/SET-ERROR", error} as const)