import React, {useEffect} from 'react';
import './App.css';
import TodolistList from "../features/TodolistList";
import AppHeader from "../features/AppBar/AppHeader";
import {SnackbarMUI} from "../components/UI/Snackbar/SnackbarMUI";
import {Navigate, Route, Routes} from "react-router-dom";
import {Login} from "../features/Login/Login";
import {useAppDispatch} from "./store";
import {initializeAppTC} from "../features/Login/auth-reducer";






function App() {

    const dispatch = useAppDispatch()

    useEffect( () => {
        dispatch(initializeAppTC)
    }, [])

    return (
        <div className="App">
            <AppHeader/>
            <Routes>
                <Route  path={'/'} element={<TodolistList/>}/>
                <Route  path={'/login'} element={<Login/>}/>
                <Route  path={"/404"} element={<h1>404: PAGE NOT FOUND</h1>}/>
                <Route  path={"*"} element={<Navigate to={"/404"}/>}/>
            </Routes>

            <SnackbarMUI alertType={"error"}/>
        </div>
    );

}
export default App;
