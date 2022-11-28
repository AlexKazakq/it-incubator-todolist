import React, {ChangeEvent, memo} from "react";
import {Checkbox, IconButton, ListItem} from "@mui/material";
import {EditableSpan} from "./EditableSpan";
import {DeleteSweepTwoTone} from "@mui/icons-material";
import {TaskType} from "./TodoList";
import {useDispatch} from "react-redux";
import {changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./store/tasks-reducer";


export type TaskPropsType = {
    task: TaskType
    todolistId: string
}

export const TaskWithRedux = memo(({task, todolistId}: TaskPropsType) => {

    const dispatch = useDispatch()

    const onClickHandler = () => dispatch(removeTaskAC(task.id, todolistId))
    const onChangeTaskStatus = (e: ChangeEvent<HTMLInputElement>) => dispatch(changeTaskStatusAC(task.id, e.currentTarget.checked, todolistId))
    const onChangeTaskTitle = (title: string) => {
        dispatch(changeTaskTitleAC(task.id, title, todolistId))
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

