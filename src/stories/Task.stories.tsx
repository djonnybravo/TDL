import type {Meta, StoryObj} from '@storybook/react';
import React, {FC, useState} from "react";
import Task, {TaskPropsType} from "../components/Task";

import {action} from "@storybook/addon-actions";
import {TaskPriorities, TaskStatuses} from "../api/todolists-api";
import {v1} from "uuid";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof Task> = {
    title: 'TODOLISTS/Task',
    component: Task,
    // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
    tags: ['autodocs'],
    // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
    args: {
        removeTask: action("ChangeTaskStatus"),
        changeTaskStatus: action("ChangeTaskStatus"),
        changeTaskTitle: action("ChangeTaskStatus"),
        task: {
            id: v1(),
            title: "Task Title",
            order: 0,
            addedDate: "",
            status: TaskStatuses.New,
            priority: TaskPriorities.Low,
            startDate: "",
            deadline: "",
            completed: false,
            todoListId: "asdasd_asdas-asdas",
            description: ""
        },
        todolistID: "uuid"
    }

};

export default meta;
type Story = StoryObj<typeof Task>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args

export const TaskIsNotDoneStory: Story = {};



export const TaskIsDoneStory: Story = {
    // More on args: https://storybook.js.org/docs/react/writing-stories/args
    args: {

        task: {
            id: v1(),
            title: "Task Title",
            order: 0,
            addedDate: "",
            status: TaskStatuses.New,
            priority: TaskPriorities.Low,
            startDate: "",
            deadline: "",
            completed: false,
            todoListId: "asdasd_asdas-asdas",
            description: ""
        },

    }
};

const TaskWithHook: FC<TaskPropsType> = (args: TaskPropsType) => {
    const [task, setTask] = useState(args.task)

    const changeTaskStatus = () => {
        setTask({...task, status: TaskStatuses.New ?  TaskStatuses.Completed :  TaskStatuses.New })

    }
    const changeTaskTitle = () => {
        setTask({...task, title: "New  Title"})
    }



    return <Task removeTask={() => {}} changeTaskStatus={changeTaskStatus} changeTaskTitle={changeTaskTitle} task={task} todolistID={args.todolistID} />
}


export const TaskWithHooksStory: Story = {
    render: args => <TaskWithHook  removeTask={() => {}} changeTaskStatus={args.changeTaskStatus} changeTaskTitle={args.changeTaskTitle} task={args.task} todolistID={args.todolistID} />
}
