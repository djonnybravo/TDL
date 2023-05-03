import React, {useState} from 'react';
import './App.css';
import Todolist from "./Todolist";


export type FilterValuesType = 'All' | 'Completed' | 'Active'

function App() {

    const [tasks,setTasks] = useState([
        {id: 1, title: 'HTML&CSS', isDone: true},
        {id: 2, title: 'JS', isDone: true},
        {id: 3, title: 'React', isDone: false}
    ])
    const [filter, setFilter] = useState<FilterValuesType>('All')
    const removeTask = (taskID:number) => {
     let removedTasks = tasks.filter(t => t.id !== taskID)
        setTasks(removedTasks)
    }
    const changeFilter = (value:FilterValuesType) =>{
        setFilter(value)
    }
    let taskForTodolist = tasks
    if (filter === "Completed") {
        taskForTodolist = tasks.filter(t => t.isDone)
    }
     if (filter === "Active") {
        taskForTodolist = tasks.filter(t => !t.isDone)
    }

    return (
        <div className="App">
            <Todolist
                title={'What to learn'}
                tasks={taskForTodolist}
                removeTask={removeTask}
                changeFilter={changeFilter}
              />
        </div>
    );
}

export default App;
