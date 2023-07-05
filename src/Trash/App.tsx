import React, {useState} from 'react';
import '../App/App.css';
import Todolist from "../features/Todolist/Todolist";
import {v1} from "uuid";
import AddItemForm from "../components/UI/AddItemForm/AddItemForm";
import {FilterValuesType, TodolistDomainType} from "../features/Todolist/todolists-reducer";
import {TaskPriorities, TaskStatuses, TaskType} from "../api/todolists-api";


export type TasksStateType = {
    [key: string]: TaskType[]
}

function App() {

    const todolistId1 = v1()
    const todolistId2 = v1()

    const [todolists, setTodolists] = useState<Array<TodolistDomainType>>([
        {id: todolistId1, title: "Что выучить:", filter: "All", order: 0, addedDate: ""},
        {id: todolistId2, title: "Что купить:", filter: "Active", order: 0, addedDate: ""}
    ])
    const [tasksObj, setTasks] = useState<TasksStateType>({
        [todolistId1]: [
            {
                id: v1(),
                title: "Task Title",
                status: TaskStatuses.New,
                order: 0,
                addedDate: "",
                priority: TaskPriorities.Low,
                startDate: "",
                deadline: "",
                completed: false,
                todoListId: todolistId1,
                description: ""
            },
            {
                id: v1(),
                title: "Task Title",
                order: 0,
                addedDate: "",
                status: TaskStatuses.New,
                priority: TaskPriorities.Low,
                startDate: "",
                deadline: "",
                completed: false,
                todoListId: todolistId1,
                description: ""
            }

        ],
        [todolistId2]: [
            {
                id: v1(),
                title: "Task Title",
                order: 0,
                addedDate: "",
                status: TaskStatuses.New,
                priority: TaskPriorities.Low,
                startDate: "",
                deadline: "",
                completed: false,
                todoListId: todolistId2,
                description: ""
            },
            {
                id: v1(),
                title: "Task Title",
                order: 0,
                addedDate: "",
                status: TaskStatuses.New,
                priority: TaskPriorities.Low,
                startDate: "",
                deadline: "",
                completed: false,
                todoListId: todolistId2,
                description: ""
            }
        ]
    })

    const removeTask = (taskID: string, todolistID: string) => {

        const tasks = tasksObj[todolistID]
        tasksObj[todolistID] = tasks.filter(t => t.id !== taskID)
        setTasks({...tasksObj})
    }
    const addTask = (title: string, todolistID: string) => {
        let task = {
            id: v1(),
            title: title,
            order: 0,
            addedDate: "",
            status: TaskStatuses.New,
            priority: TaskPriorities.Low,
            startDate: "",
            deadline: "",
            completed: false,
            todoListId: todolistID,
            description: ""};
        const tasks = tasksObj[todolistID]
        tasksObj[todolistID] = [task, ...tasks]
        setTasks({...tasksObj});

    }
    const changeTaskStatus = (taskID: string, status: TaskStatuses, todolistID: string) => {
        const tasks = tasksObj[todolistID]
        let task = tasks.find(t => t.id === taskID);
        if (task) {
            task.status = status
            tasksObj[todolistID] = tasks
            setTasks({...tasksObj})
        }
    }
    const changeTaskTitle = (taskId: string, NewTitle: string, todolistID: string) => {
        const tasks = tasksObj[todolistID]
        let task = tasks.find(t => t.id === taskId);
        if (task) {
            task.title = NewTitle
            tasksObj[todolistID] = tasks
            setTasks({...tasksObj})
        }
    }

    const addTodolist = (title: string) => {
        let newTodolist: TodolistDomainType = {id: v1(), title: title, filter: "All", order: 0, addedDate: ""}
        setTodolists([newTodolist, ...todolists])
        setTasks({...tasksObj, [newTodolist.id]: []})
    }
    const removeTodolist = (todolistID: string) => {
        let filteredTodolist = todolists.filter(tl => tl.id !== todolistID)
        setTodolists([...filteredTodolist])
        delete tasksObj[todolistID]
        setTasks({...tasksObj})
    }
    const changeTodolistTitle = (newTitle: string, todolistID: string) => {
        let todolist = todolists.find(tl => tl.id === todolistID)
        if (todolist) {
            todolist.title = newTitle
            setTodolists([...todolists])
        }
    }
    const changeFilter = (value: FilterValuesType, todolistID: string) => {
        let todolist = todolists.find(tl => tl.id === todolistID)
        if (todolist) {
            todolist.filter = value
            setTodolists([...todolists])
        }
    }

    return (
        <div className="App">

            <div style={
                {
                    padding: "20px",
                    border: "2px solid blue",
                    display: "flex",
                    alignItems: "center",
                    flexDirection: "column"
                }}>
               <span style={{marginBottom: "90px"}}>Создай новый тудулист</span>
                <AddItemForm addItem={addTodolist}/>
            </div>

            {
                todolists.map((todolist) => {

                    let taskForTodolist = tasksObj[todolist.id]
                    if (todolist.filter === "Completed") {
                        taskForTodolist = taskForTodolist.filter(t => t.status === TaskStatuses.Completed)
                    }
                    if (todolist.filter === "Active") {
                        taskForTodolist = tasksObj[todolist.id].filter(t => t.status === TaskStatuses.New)
                    }


                    return <Todolist
                        key={todolist.id}
                        todolistID={todolist.id}
                        title={todolist.title}
                        tasks={taskForTodolist}
                        removeTask={removeTask}
                        addTask={addTask}
                        changeFilter={changeFilter}
                        changeTaskStatus={changeTaskStatus}
                        filter={todolist.filter}
                        removeTodolist={removeTodolist}
                        changeTodolistTitle={changeTodolistTitle}
                        changeTaskTitle={changeTaskTitle}
                    />
                })
            }
        </div>
    );
}

export default App;
