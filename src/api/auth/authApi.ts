import {LoginType} from "../../features/Login/Login";
import {instance} from "../todolists-api";



export const authAPI = {
    login(data: LoginType) {
        return instance.post('auth/login', data)
    },
    logme() {
        return instance.get('auth/me')
    }
}