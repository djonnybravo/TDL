import React, {useEffect, useState} from 'react'
import axios from "axios";
import {todolistsApi} from "../api/todolists-api";

export default {
    title: 'API'
}


export const GetTodolists = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        // здесь мы будем делать запрос и ответ закидывать в стейт.
        // который в виде строки будем отображать в div-ке


        todolistsApi.getTodolist()
            .then((res) => {
                console.log(res)
                setState(res.data)
            })


    }, [])
    return <div>{JSON.stringify(state)}</div>
}
export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)

    useEffect(() => {
        todolistsApi.createTodolist("SOME NEW TITLE2")
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

        todolistsApi.deleteTodolist("48b2234e-b8d6-4702-91dc-b16f15bd78c9")
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

        todolistsApi.updateTodolistTitle("75a28f95-0548-403c-ab61-0b6675dab02d", "SOME NEW TITLE 33")
            .then((res) => {
                    console.log(res)
                    setState(res.data)
                }
            )
   }, [])

    return <div>{JSON.stringify(state)}</div>
}