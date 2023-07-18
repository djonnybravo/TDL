import React, {useEffect} from 'react';
import './App.css';
import TodolistList from "../features/TodolistList";
import AppHeader from "../features/AppBar/AppHeader";
import {SnackbarMUI} from "../components/UI/Snackbar/SnackbarMUI";
import {Navigate, Route, Routes} from "react-router-dom";
import {Login} from "../features/Login/Login";
import {AppRootStateType, useAppDispatch} from "./store";
import {initializeAppTC} from "../features/Login/auth-reducer";
import {CircularProgress} from "@mui/material";
import {useSelector} from "react-redux";






function App() {

    const dispatch = useAppDispatch()
    const isInitialized = useSelector<AppRootStateType>(state => state.app.isInitialized)

    useEffect( () => {
        dispatch(initializeAppTC())
    }, [])




    if (!isInitialized) {
        return <div
            style={{position: 'fixed', top: '30%', textAlign: 'center', width: '100%'}}>
            <CircularProgress/>
        </div>
    }



    return (
        <div className="App">
            <AppHeader/>
            <Routes>
                <Route  path={'/'} element={<TodolistList/>}/>
                <Route  path={'/logIn'} element={<Login/>}/>
                <Route  path={"/404"} element={<h1>404: PAGE NOT FOUND</h1>}/>
                <Route  path={"*"} element={<Navigate to={"/404"}/>}/>
            </Routes>

            <SnackbarMUI alertType={"error"}/>
        </div>
    );

}
export default App;
