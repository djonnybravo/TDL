import axios from 'axios'
import {LoginType} from "../../features/Login/Login";

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {
        "API-KEY": "d49d0d6f-9d1b-4840-b7a2-147b39bd1e13"
    }
})


export const authAPI = {
    login(data: LoginType) {
        return instance.post('auth/login', data)
    },
    logme() {
        return instance.get('auth/me')
    }
}