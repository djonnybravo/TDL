




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

    status: statusType
    error: string | null
}
type statusType = 'idle' | 'loading' | 'success' | 'failed'
type ActionsTypes = any

export const SetStatusAC = (status: statusType) => ({type: "APP/SET-STATUS", status})
export const SetErrorAC = (error: string | null) => ({type: "APP/SET-ERROR", error})