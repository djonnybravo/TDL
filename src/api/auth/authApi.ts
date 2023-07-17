import axios from 'axios'

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {
        "API-KEY": "d49d0d6f-9d1b-4840-b7a2-147b39bd1e13"
    }
})


export const authAPI = {
    isLogged(id: number, email: string, login: string) {
        return instance.get('auth/me')
    },
    login(email: string, password: string, rememberMe: boolean) {
        return instance.post('auth/login', {email, password, rememberMe})
    }
}