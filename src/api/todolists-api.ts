import axios from "axios";
import {DeleteTodolist} from "../stories/todolists-api.stories";

const settings = {
    withCredentials: true,
    headers: {
        "API-KEY": "d49d0d6f-9d1b-4840-b7a2-147b39bd1e13"
    }
}

const todolistID = ""


export const todolistsApi = {
    getTodolist() {
       return axios.get("https://social-network.samuraijs.com/api/1.1/todo-lists", settings)
    },
    createTodolist(newTitle: string) {
        return axios.post("https://social-network.samuraijs.com/api/1.1/todo-lists", {title: newTitle}, settings)
    },
    deleteTodolist(todolistID: string) {
        return axios.delete(`https://social-network.samuraijs.com/api/1.1/todo-lists/${todolistID}`, settings)
    },
    updateTodolistTitle(todolistID: string, newTitle: string) {
        return axios.put("https://social-network.samuraijs.com/api/1.1/todo-lists/" + todolistID, {title: newTitle}, settings)
    }
}