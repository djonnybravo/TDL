
import React, {useEffect, useState} from 'react'
import axios from "axios";

export default {
    title: 'API'
}

const settings = {
    withCredentials: true,
    headers: {
        "API-KEY": "d49d0d6f-9d1b-4840-b7a2-147b39bd1e13"
    }
}


export const GetTodolists = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        // здесь мы будем делать запрос и ответ закидывать в стейт.
        // который в виде строки будем отображать в div-ке


        axios.get("https://social-network.samuraijs.com/api/1.1/todo-lists", settings)
            .then((res) => {
                console.log(res)
                setState(res.data)
            })


    }, [])
    return <div>{JSON.stringify(state)}</div>
}
export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)
     const newTitle = {
        title: "New Todolist"
    }
    useEffect(() => {
        axios.post("https://social-network.samuraijs.com/api/1.1/todo-lists", newTitle , settings)
            .then((res) => {
                console.log(res)
                setState(res.data)
            }
            )

    }, [])


    return <div>{JSON.stringify(state)}</div>
}
export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {



        axios.delete("https://social-network.samuraijs.com/api/1.1/todo-lists/75a28f95-0548-403c-ab61-0b6675dab02d", settings)
            .then((res) => {
                    console.log(res)
                    setState(res.data)
                }
            )


    }, [])

    return <div>{JSON.stringify(state)}</div>
}
export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {

        let newTtitle = {
            title: "SOME NEW TITLE"
        }
        axios.put("https://social-network.samuraijs.com/api/1.1/todo-lists/75a28f95-0548-403c-ab61-0b6675dab02d", newTtitle, settings)
            .then((res) => {
                    console.log(res)
                    setState(res.data)
                }
            )


    }, [])

    return <div>{JSON.stringify(state)}</div>
}