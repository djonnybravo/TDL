import React from 'react';
import './App.css';
import TodolistList from "../features/TodolistList";
import AppHeader from "../features/AppBar/AppHeader";






function App() {

    console.log("app rendering")

    return (
        <div className="App">
            <AppHeader/>
            <TodolistList/>
        </div>
    );

}
export default App;
