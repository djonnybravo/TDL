import React, {ChangeEvent, memo, useState} from 'react';
import {TextField} from "@mui/material";

type EditableSpanPropsType = {
    title:string
    onChange: (title:string) => void
}

const EditableSpan = memo((props: EditableSpanPropsType) => {
    console.log("EDITABLESPAN")
    let [editMode, SetEditMode] = useState(false)
    let [title, setTitle] = useState(props.title)
    let [error, setError] = useState<string | null>(null)

    const activateEditMode = () => SetEditMode(true)
    const activateViewMode = () => {
        SetEditMode(false)
        props.onChange(title)
    }
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
        setError(null)
    }

    return editMode
        ? <TextField
            value={title}
            variant="standard"
            onBlur={activateViewMode}
            autoFocus
            onChange={onChangeHandler}

        />
        : <span onDoubleClick={activateEditMode}>{title}</span>
})

export default EditableSpan;