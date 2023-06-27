import axios from "axios";


const settings = {
    withCredentials: true,
    headers: {
        "API-KEY": "d49d0d6f-9d1b-4840-b7a2-147b39bd1e13"
    }
}
const instance = axios.create({
    baseURL: "https://social-network.samuraijs.com/api/1.1/",
    ...settings
})


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

type TaskType = {
    description: string
    title: string
    completed: boolean
    status: number
    priority: number
    startDate: string
    deadline: string
    id: string
    todoListId: string
    order: number
    addedDate: number
}
type GetTaskResponseType = {
    error: string | null
    totalCount: number
    items: TaskType[]
}


export const todolistsApi = {
    getTodolist() {
       return instance.get<TodolistType[]>("todo-lists")
    },
    createTodolist(newTitle: string) {
        return instance.post<CreateTodolistResponseType>("todo-lists", {title: newTitle})
    },
    deleteTodolist(todolistID: string) {
        return instance.delete<DeleteTodolistResponseType>(`todo-lists/${todolistID}`)
    },
    updateTodolistTitle(todolistID: string, newTitle: string) {
        return instance.put<UpdateTodolistResponseType>(`todo-lists/${todolistID}`, {title: newTitle})
    },
    getTasks(todolistID:string) {
        return instance.get<GetTaskResponseType>(`todo-lists/${todolistID}/tasks`)

    },
    createTask(todolistID:string, taskTitle: string) {
        return instance.post(`todo-lists/${todolistID}/tasks`,{title: taskTitle})

    },
    changeTaskTitle(todolistID:string, taskID:string, taskTitle: string) {
        return instance.put(`todo-lists/${todolistID}/tasks/${taskID}`,{title: taskTitle})

    },
    deleteTask(todolistID:string, taskID: string) {
        return instance.delete(`todo-lists/${todolistID}/tasks/${taskID}`)

    },

}