import React, {ChangeEvent, memo, useCallback} from "react";
import {FilterValuesType} from "./App";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {Button, ButtonGroup, Checkbox, IconButton, List, ListItem, Typography} from "@mui/material";
import {DeleteForever, DeleteSweepTwoTone} from "@mui/icons-material";
import {Task} from "./Task";
//rsc
type TodoListPropsType = {
    todoListId: string
    title: string
    tasks: Array<TaskType>
    filter: FilterValuesType
    removeTask: (taskId: string, todoListId: string) => void
    changeTodoListFilter: (filter: FilterValuesType, todoListId: string) => void
    addTask: (title: string, todoListId: string) => void
    changeTaskStatus: (taskId: string, isDone: boolean, todoListId: string) => void
    removeTodoList: (todoListId: string) => void
    changeTaskTitle: (taskId: string, title: string, todoListId: string) => void
    changeTodoListTitle: (title: string, todoListId: string) => void
}

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}


export const TodoList = memo((props: TodoListPropsType) => {


    const removeTask = useCallback((taskId: string) => props.removeTask(taskId, props.todoListId), [props.removeTask, props.todoListId])
    const changeTaskStatus = useCallback((taskId: string, status: boolean) => props.changeTaskStatus(taskId, status, props.todoListId), [props.changeTaskStatus, props.todoListId])
    const changeTaskTitle = useCallback((taskId: string, title: string) => {
        props.changeTaskTitle(taskId, title, props.todoListId)
    }, [ props.changeTaskTitle, props.todoListId])
    const getTasksListItem = (t: TaskType) => {
        return (
            <Task
                key={t.id}
                task={t}
                removeTask={removeTask}
                changeTaskStatus={changeTaskStatus}
                changeTaskTitle={changeTaskTitle}
            />
        )
    }
    let tasks = props.tasks;
    if (props.filter === "active") {
        tasks = props.tasks.filter(t => !t.isDone)
    }
    if (props.filter === "completed") {
        tasks = props.tasks.filter(t => t.isDone)
    }
    const tasksList = tasks.length
        ? <List>{tasks.map(getTasksListItem)}</List>
        : <span>Your taskslist is empty :(</span>

    const addTask = useCallback((title: string) => {
        props.addTask(title, props.todoListId)
    }, [props.addTask, props.todoListId])
    const handlerCreator = useCallback((filter: FilterValuesType) => {
        return () => props.changeTodoListFilter(filter, props.todoListId)
    }, [props.changeTodoListFilter, props.todoListId])

    const removeTodoListHandler = () => props.removeTodoList(props.todoListId)

    const changeTodoListTitle = useCallback((title: string) => {
        props.changeTodoListTitle(title, props.todoListId)
    }, [props.changeTodoListTitle, props.todoListId])


    return (
        <div>
            <Typography variant={"h5"} align={"center"} style={{fontWeight: "bold", marginBottom: "20px"}}>
                <EditableSpan title={props.title} changeTitle={changeTodoListTitle}/>
                <IconButton size={"small"} onClick={removeTodoListHandler} color={"secondary"}>
                    <DeleteForever/>
                </IconButton>
            </Typography>
            <AddItemForm addItem={addTask}/>
            {tasksList}
            <div>
                <ButtonGroup
                    size={"small"}
                    variant="contained"
                    aria-label="outlined primary button group"
                    fullWidth
                >
                    <ButtonWithMemo
                        style={{marginRight: "1px", fontSize: "11px"}}
                        color={props.filter === "all" ? "secondary" : "primary"}
                        onClick={handlerCreator("all")}
                        title={"all"}
                    />
                    <ButtonWithMemo
                        style={{marginRight: "1px", fontSize: "11px"}}
                        color={props.filter === "active" ? "secondary" : "primary"}
                        onClick={handlerCreator("active")}
                        title={"active"}
                    />
                    <ButtonWithMemo
                        style={{fontSize: "11px"}}
                        color={props.filter === "completed" ? "secondary" : "primary"}
                        onClick={handlerCreator("completed")}
                        title={"completed"}
                    />
                </ButtonGroup>
            </div>
        </div>
    );
});

type ButtonWithMemo = {
    style: React.CSSProperties
    color: "inherit" | "primary" | "secondary" | "success" | "error" | "info" | "warning" | undefined
    onClick: () => void
    title: FilterValuesType
}

const ButtonWithMemo = memo((props: ButtonWithMemo) => {
    return <Button
        style={props.style}
        color={props.color}
        onClick={props.onClick}
    >{props.title}</Button>
})
