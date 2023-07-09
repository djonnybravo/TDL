




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
    error: null
}

type initialStateType = {

    status: 'idle' | 'loading' | 'success' | 'failed'
    error: string | null
}

type ActionsTypes = any
