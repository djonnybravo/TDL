import {LoginType} from "../../features/Login/Login";
import {instance, ResponseType} from "../todolists-api";

type UserData = {
    id: number
    email: string
    login: string
}

export const authAPI = {
    login(data: LoginType) {
        return instance.post('auth/login', data)
    },
    me() {
        return instance.get<ResponseType<UserData>>('auth/me')
    }
}
