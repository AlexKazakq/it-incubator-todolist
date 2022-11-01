import React, {ChangeEvent} from "react";
import {FilterValuesType} from "./App";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {Button, ButtonGroup, Checkbox, IconButton, List, ListItem, Typography} from "@mui/material";
import {DeleteForever, DeleteSweepTwoTone} from "@mui/icons-material";
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


const TodoList = (props: TodoListPropsType) => {

    const getTasksListItem = (t: TaskType) => {
        const removeTask = () => props.removeTask(t.id, props.todoListId)
        const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) => props.changeTaskStatus(t.id, e.currentTarget.checked, props.todoListId)
        const changeTaskTitle = (title: string) => {
            props.changeTaskTitle(t.id, title, props.todoListId)
        }
        return (
            <ListItem
                key={t.id}
                className={t.isDone ? "isDone" : "notIsDone"}
                style={{
                    padding: "0px",
                    justifyContent: "space-between",
                    textDecoration: t.isDone ? "line-through" : "none"
                }}
            >
                <Checkbox
                    onChange={changeTaskStatus}
                    checked={t.isDone}
                    size={"small"}/>
                <EditableSpan title={t.title} changeTitle={changeTaskTitle}/>
                <IconButton size={"small"} onClick={removeTask}>
                    <DeleteSweepTwoTone/>
                </IconButton>
            </ListItem>
        )
    }
    const tasksList = props.tasks.length
        ? <List>{props.tasks.map(getTasksListItem)}</List>
        : <span>Your taskslist is empty :(</span>

    const addTask = (title: string) => {
        props.addTask(title, props.todoListId)
    }
    const handlerCreator = (filter: FilterValuesType) => {
        return () => props.changeTodoListFilter(filter, props.todoListId)
    }

    const removeTodoListHandler = () => props.removeTodoList(props.todoListId)

    const changeTodoListTitle = (title: string) => {
        props.changeTodoListTitle(title, props.todoListId)
    }
    return (
        <div>
            <Typography variant={"h5"} align={"center"} style={{fontWeight: "bold", marginBottom: '20px'}}>
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
                    <Button
                        style={{marginRight: "1px", fontSize: '11px'}}
                        color={props.filter === "all" ? "secondary" : "primary"}
                        onClick={handlerCreator("all")}
                    >All</Button>
                    <Button
                        style={{marginRight: "1px", fontSize: '11px'}}
                        color={props.filter === "active" ? "secondary" : "primary"}
                        onClick={handlerCreator("active")}
                    >Active</Button>
                    <Button
                        style={{fontSize: '11px'}}
                        color={props.filter === "completed" ? "secondary" : "primary"}
                        onClick={handlerCreator("completed")}
                    >Completed</Button>
                </ButtonGroup>
            </div>
        </div>
    );
};

export default TodoList;