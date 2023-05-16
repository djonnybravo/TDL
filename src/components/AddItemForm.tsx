import React, {ChangeEvent, KeyboardEvent, useState} from 'react';

type AddItemFormPropsType = {
    addItem: (title: string) => void
}

const AddItemForm = (props: AddItemFormPropsType) => {

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
            <input
                value={newTaskTitle}
                onChange={onChangeInputHandler}
                onKeyPress={onKeyPressInputHandler}
                className={error ? "error" : ""}
            />
            <button onClick={addItem}>+</button>
            {error && <div className="error-message">Field is required and cant be empty!</div>}

        </div>
    );
};

export default AddItemForm;