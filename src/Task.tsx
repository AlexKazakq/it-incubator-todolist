import React, {ChangeEvent, memo} from "react";
import {Checkbox, IconButton, ListItem} from "@mui/material";
import {EditableSpan} from "./EditableSpan";
import {DeleteSweepTwoTone} from "@mui/icons-material";
import {TaskType} from "./TodoList";


export type TaskPropsType = {
    task: TaskType
    removeTask: (taskId: string) => void
    changeTaskStatus: (taskId: string, isDone: boolean) => void
    changeTaskTitle: (taskId: string, title: string) => void
}

export const Task = memo(({task, removeTask, changeTaskTitle, changeTaskStatus}: TaskPropsType) => {

    const onClickHandler = () => removeTask(task.id)
    const onChangeTaskStatus = (e: ChangeEvent<HTMLInputElement>) => changeTaskStatus(task.id, e.currentTarget.checked)
    const onChangeTaskTitle = (title: string) => {
        changeTaskTitle(task.id, title)
    }

    return (
            <ListItem
                key={task.id}
                className={task.isDone ? "isDone" : "notIsDone"}
                style={{
                    padding: "0px",
                    justifyContent: "space-between",
                    textDecoration: task.isDone ? "line-through" : "none"
                }}
            >
                <Checkbox
                    onChange={onChangeTaskStatus}
                    checked={task.isDone}
                    size={"small"}/>
                <EditableSpan title={task.title} changeTitle={onChangeTaskTitle}/>
                <IconButton size={"small"} onClick={onClickHandler}>
                    <DeleteSweepTwoTone/>
                </IconButton>
            </ListItem>
    );
});

