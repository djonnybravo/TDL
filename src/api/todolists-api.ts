import axios, {AxiosResponse} from "axios";


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


export type TodolistType = {
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
type ResponseType<D = {}> = {
    resultCode: number
    messages: string[]
    data: D
}
export enum TaskStatuses  {
   New = 0,
   InProgress = 1,
   Completed = 2,
   Draft = 3
}
export enum TaskPriorities {
    Low = 0,
    Middle = 1,
    High = 2,
    Urgently = 3,
    Later = 4
}
export type TaskType = {
    id: string
    title: string
    status: TaskStatuses
    description: string
    completed: boolean
    priority: TaskPriorities
    startDate: string
    deadline: string
    todoListId: string
    order: number
    addedDate: string
}
type GetTaskResponseType = {
    error: string | null
    totalCount: number
    items: TaskType[]
}
type CreateTaskResponseType = {
    resultCode: number
    messages: string[],
    data: {
        item: TaskType
    }
}
type ChangeTaskTitleResponseType = {
    resultCode: number
    messages: string[],
    data: {
        item: TaskType
    }
}
export type UpdateTaskModelType = {
    title: string
    description: string
    status: TaskStatuses
    priority: TaskPriorities
    startDate: string
    deadline: string
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
    updateTodolist(todolistID: string, newTitle: string) {
        return instance.put<UpdateTodolistResponseType>(`todo-lists/${todolistID}`, {title: newTitle})
    },
    getTasks(todolistID:string) {
        return instance.get<GetTaskResponseType>(`todo-lists/${todolistID}/tasks`)
    },
    createTask(todolistID:string, taskTitle: string) {
        return instance.post<CreateTaskResponseType>(`todo-lists/${todolistID}/tasks`,{title: taskTitle})
    },
    updateTask(todolistId: string, taskId: string, model: UpdateTaskModelType) {
        return instance.put<ResponseType<{ item: TaskType }>, AxiosResponse<ResponseType<{ item: TaskType }>>, UpdateTaskModelType>(`todo-lists/${todolistId}/tasks/${taskId}`, model);
    },
    deleteTask(todolistID:string, taskID: string) {
        return instance.delete<ResponseType>(`todo-lists/${todolistID}/tasks/${taskID}`)
    },
}