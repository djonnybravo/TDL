import React from 'react';
import './App.css';
import Todolist from "./Todolist";


let tasks = [
    {id: 1, title: 'HTML&CSS', isDone: true},
    {id: 2, title: 'JS', isDone: true},
    {id: 3, title: 'React', isDone: true}
]

function App() {
    return (
        <div className="App">
            <Todolist title={'What to learn'} tasks={tasks}/>
        </div>
    );
}

export default App;
