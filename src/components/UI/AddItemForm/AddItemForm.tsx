import React, {ChangeEvent, KeyboardEvent, memo, useState} from 'react';
import {Button, IconButton, TextField} from "@mui/material";
import {ControlPoint} from "@mui/icons-material";

export type AddItemFormPropsType = {
    addItem: (title: string) => void
    disabled?: boolean
}

const AddItemForm = React.memo((props: AddItemFormPropsType) => {
    console.log("AdditemForm render")
    const [title, setTitle] = useState(' ')
    const [error, setError] = useState(false)

    const onChangeInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
        setError(false)
    }
    const onKeyPressInputHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.charCode == 13) {
            props.addItem(title);
            setTitle('')
            setError(false)
        }
    }
    const addItem = () => {
        if (title.trim() !== "") {
            props.addItem(title);
            setTitle('')

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
                value={title}
                onChange={onChangeInputHandler}
                onKeyPress={onKeyPressInputHandler}
                disabled={props.disabled}
            />
            <IconButton onClick={addItem} disabled={props.disabled} color={props.disabled || error ? 'error' : "primary"}>
                <ControlPoint />
            </IconButton>


        </div>
    );
});

export default AddItemForm;