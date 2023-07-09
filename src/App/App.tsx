import React from 'react';
import './App.css';
import TodolistList from "../features/TodolistList";
import AppHeader from "../features/AppBar/AppHeader";
import {SnackbarMUI} from "../components/UI/Snackbar/SnackbarMUI";






function App() {

    console.log("app rendering")

    return (
        <div className="App">
            <AppHeader/>
            <TodolistList/>
            <SnackbarMUI alertType={"success"} message={"This is an error message"} />
        </div>
    );

}
export default App;
