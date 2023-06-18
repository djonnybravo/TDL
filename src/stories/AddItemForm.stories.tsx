import type { Meta, StoryObj } from '@storybook/react';
import {action} from '@storybook/addon-actions'
import AddItemForm, {AddItemFormPropsType} from "../components/AddItemForm";
import React, {ChangeEvent, FC, KeyboardEvent, useState} from "react";
import {IconButton, TextField} from "@mui/material";
import {ControlPoint} from "@mui/icons-material";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof AddItemForm> = {
  title: 'TODOLISTS/AddItemForm',
  component: AddItemForm,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    addItem: {
      description: "Button clicked inside form",
      action: 'clicked'
    },
  },

};

export default meta;
type Story = StoryObj<typeof AddItemForm>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
export const DefauldAddItemForm: Story = {
  // More on args: https://storybook.js.org/docs/react/writing-stories/args
 args: {
   addItem: action('Button clicked inside form')
 }
};


const AddItemFormError: FC<AddItemFormPropsType> = React.memo((args: AddItemFormPropsType) => {
  console.log("AdditemForm render")
  const [newTaskTitle, setNewTaskTitle] = useState(' ')
  const [error, setError] = useState(true)

  const onChangeInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setNewTaskTitle(e.currentTarget.value)
    setError(false)
  }
  const onKeyPressInputHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.charCode == 13) {
      args.addItem(newTaskTitle);
      setNewTaskTitle('')
      setError(false)
    }
  }
  const addItem = () => {
    if (newTaskTitle.trim() !== "") {
      args.addItem(newTaskTitle);
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

      </div>
  );
});





export const AddItemFormWithError: Story = {
  // More on args: https://storybook.js.org/docs/react/writing-stories/args
  render: (args) => <AddItemFormError addItem={args.addItem}/>

};
