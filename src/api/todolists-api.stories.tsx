import React, {useEffect, useState} from 'react'
import {TaskPriorities, TaskStatuses, todolistsAPI} from "../../api/todolists-api";

export default {
    title: 'API/TODOLIST'
}


export const GetTodolists = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        // здесь мы будем делать запрос и ответ закидывать в стейт.
        // который в виде строки будем отображать в div-ке


        todolistsAPI.getTodolists()
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
        todolistsAPI.createTodolist("SOME NEW TITLE2")
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

        todolistsAPI.deleteTodolist("48b2234e-b8d6-4702-91dc-b16f15bd78c9")
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

        todolistsAPI.updateTodolist("75a28f95-0548-403c-ab61-0b6675dab02d", "SOME NEW TITLE 33")
            .then((res) => {
                    console.log(res)
                    setState(res.data)
                }
            )
   }, [])

    return <div>{JSON.stringify(state)}</div>
}


export const GetTasks = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {


        todolistsAPI.getTasks("258d8c5f-3ad7-401b-ac6d-9c18ae4d65ce")
            .then((res) => {
                console.log(res)
                setState(res.data)
            })


    }, [])
    return <div>{JSON.stringify(state)}</div>
}
export const CreateTaskInTodolist = () => {
    const [state, setState] = useState<any>(null)

    useEffect(() => {
        todolistsAPI.createTask("258d8c5f-3ad7-401b-ac6d-9c18ae4d65ce", "New Task")
            .then((res) => {
                console.log(res)
                setState(res.data.data.item)
            })


    }, [])
    return <div>
        {JSON.stringify(state)}
    </div>
}
export const UpdateTask = () => {
    const [state, setState] = useState<any>(null)
    const model = {title: "NEW TITLE!", status: TaskStatuses.New, deadline: "", description: "", priority: TaskPriorities.Low, startDate: ""}
    useEffect(() => {

        todolistsAPI.updateTask("258d8c5f-3ad7-401b-ac6d-9c18ae4d65ce", "36b8a887-c6ab-4b92-94b5-ccf2d2a055ad",model )
            .then((res) => {
                console.log(res)
                setState(res.data)
            })


    }, [])
    return <div>{JSON.stringify(state)}</div>
}
export const DeleteTask = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {


        todolistsAPI.deleteTask("258d8c5f-3ad7-401b-ac6d-9c18ae4d65ce", "0a2780ad-52bc-4deb-a41e-849477271147")
            .then((res) => {
                console.log(res)
                setState(res.data)
            })


    }, [])
    return <div>{JSON.stringify(state)}</div>
}