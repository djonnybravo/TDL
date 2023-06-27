import axios from "axios";


const settings = {
    withCredentials: true,
    headers: {
        "API-KEY": "d49d0d6f-9d1b-4840-b7a2-147b39bd1e13"
    }
}

type TodolistType = {
    id: string
    addedDate: string
    order: number
    title: string
}
type CreateTodolistResponseType = {
    resultCode: number
    messages: Array<string>
    fieldsErrors: Array<string>
    data: {
        item: TodolistType
    }
}
type UpdateTodolistResponseType = {
    resultCode: number
    messages: Array<string>
    fieldsErrors: Array<string>
    data: {}
}
type DeleteTodolistResponseType = {
    resultCode: number
    messages: Array<string>
    fieldsErrors: Array<string>
    data: {}
}





export const todolistsApi = {
    getTodolist() {
       return axios.get<TodolistType[]>("https://social-network.samuraijs.com/api/1.1/todo-lists", settings)
    },
    createTodolist(newTitle: string) {
        return axios.post<CreateTodolistResponseType>("https://social-network.samuraijs.com/api/1.1/todo-lists", {title: newTitle}, settings)
    },
    deleteTodolist(todolistID: string) {
        return axios.delete<DeleteTodolistResponseType>(`https://social-network.samuraijs.com/api/1.1/todo-lists/${todolistID}`, settings)
    },
    updateTodolistTitle(todolistID: string, newTitle: string) {
        return axios.put<UpdateTodolistResponseType>("https://social-network.samuraijs.com/api/1.1/todo-lists/" + todolistID, {title: newTitle}, settings)
    },
    getTasks(todolistID:string) {
        return axios.get(`https://social-network.samuraijs.com/api/1.1/todo-lists/${todolistID}/tasks`, settings)

    },
    createTask(todolistID:string, taskTitle: string) {
        return axios.post(`https://social-network.samuraijs.com/api/1.1/todo-lists/${todolistID}/tasks`,{title: taskTitle}, settings)

    },
    changeTaskTitle(todolistID:string, taskID:string, taskTitle: string) {
        return axios.put(`https://social-network.samuraijs.com/api/1.1/todo-lists/${todolistID}/tasks/${taskID}`,{title: taskTitle}, settings)

    },
    deleteTask(todolistID:string, taskID: string) {
        return axios.delete(`https://social-network.samuraijs.com/api/1.1/todo-lists/${todolistID}/tasks/${taskID}`, settings)

    },

}