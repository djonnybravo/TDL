import {LoginType} from "../../features/Login/Login";
import {instance, ResponseType} from "../todolists-api";

type UserData = {
    id: number
    email: string
    login: string
}

export const authAPI = {
    logIn(data: LoginType) {
        return instance.post('auth/login', data)
    },
    logOut() {
        return instance.delete<ResponseType>('auth/login')
    },
    me() {
        return instance.get<ResponseType<UserData>>('auth/me')
    }
}
