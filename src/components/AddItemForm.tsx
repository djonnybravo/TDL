import React, {ChangeEvent, KeyboardEvent, memo, useState} from 'react';
import {Button, IconButton, TextField} from "@mui/material";
import {ControlPoint} from "@mui/icons-material";

type AddItemFormPropsType = {
    addItem: (title: string) => void
}

const AddItemForm = React.memo((props: AddItemFormPropsType) => {
    console.log("AdditemForm render")
    const [newTaskTitle, setNewTaskTitle] = useState(' ')
    const [error, setError] = useState(false)

    const onChangeInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTaskTitle(e.currentTarget.value)
        setError(false)
    }
    const onKeyPressInputHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.charCode == 13) {
            props.addItem(newTaskTitle);
            setNewTaskTitle('')
            setError(false)
        }
    }
    const addItem = () => {
        if (newTaskTitle.trim() !== "") {
            props.addItem(newTaskTitle);
            setNewTaskTitle('')

        } else {
            setError(true)
        }
    }

    return (
        <div>
            <TextField
                id="standard-basic"
                label="Введите название"
                variant="standard"
                error={error}
                helperText="Поле обязательно и не может быть пустым"
                value={newTaskTitle}
                onChange={onChangeInputHandler}
                onKeyPress={onKeyPressInputHandler}

            />
            <IconButton onClick={addItem}>
                <ControlPoint color={ error ? "error" : "primary"}/>
            </IconButton>


            {/*<input*/}
            {/*    value={newTaskTitle}*/}
            {/*    onChange={onChangeInputHandler}*/}
            {/*    onKeyPress={onKeyPressInputHandler}*/}
            {/*    className={error ? "error" : ""}*/}
            {/*/>*/}
            {/*<Button onClick={addItem}>+</Button>*/}
            {/*{error && <div className="error-message">Field is required and cant be empty!</div>}*/}

        </div>
    );
});

export default AddItemForm;