import React, {ChangeEvent, FC} from "react";
import {TasksStateType, TodoListType} from "../AppWithRedux";
import {Button, ButtonGroup, Checkbox, IconButton, List, ListItem, Typography} from "@mui/material";
import {EditableSpan} from "../EditableSpan";
import {DeleteForever, DeleteSweepTwoTone} from "@mui/icons-material";
import {FilterValuesType} from "../App";
import {AddItemForm} from "../AddItemForm";
import {TaskType} from "../TodoList";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./store";
import {Dispatch} from "redux";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./tasks-reducer";
import {changeTodoListFilterAC, changeTodoListTitleAC, removeTodoListAC} from "./todolist-reducer";

export type TodolistWithReduxPropsType = {
    todolist: TodoListType
}


const TodoListWithRedux: FC<TodolistWithReduxPropsType> = ({todolist}) => {
    const {id, title, filter} = todolist

    let tasks = useSelector<AppRootStateType, TaskType[]>(state => state.tasks[id])

    const dispatch = useDispatch<Dispatch>()

    const getTasksListItem = (t: TaskType) => {
        const removeTask = () => dispatch(removeTaskAC(t.id, id))
        const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) => dispatch(changeTaskStatusAC(t.id, e.currentTarget.checked, id))
        const changeTaskTitle = (title: string) => {
            dispatch(changeTaskTitleAC(t.id, title, id))
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

    const handlerCreator = (filter: FilterValuesType) => {
        return () => dispatch(changeTodoListFilterAC(filter, id))
    }

    if (filter === "active") {
        tasks = tasks.filter(t => !t.isDone)
    } else if (filter === "completed") {
        tasks = tasks.filter(t => t.isDone)
    }

    let tasksList = tasks.length
        ? <List>{tasks.map(getTasksListItem)}</List>
        : <span>Your taskslist is empty :(</span>

    const addTask = (title: string) => {
        dispatch(addTaskAC(title, id))
    }


    const removeTodoListHandler = () =>  dispatch(removeTodoListAC(id))

    const changeTodoListTitle = (title: string) => {
        dispatch(changeTodoListTitleAC(title, id))
    }

    return (
        <div>
            <Typography variant={"h5"} align={"center"} style={{fontWeight: "bold", marginBottom: '20px'}}>
                <EditableSpan title={title} changeTitle={changeTodoListTitle}/>
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
                        color={filter === "all" ? "secondary" : "primary"}
                        onClick={handlerCreator("all")}
                    >All</Button>
                    <Button
                        style={{marginRight: "1px", fontSize: '11px'}}
                        color={filter === "active" ? "secondary" : "primary"}
                        onClick={handlerCreator("active")}
                    >Active</Button>
                    <Button
                        style={{fontSize: '11px'}}
                        color={filter === "completed" ? "secondary" : "primary"}
                        onClick={handlerCreator("completed")}
                    >Completed</Button>
                </ButtonGroup>
            </div>
        </div>
    );
};

export default TodoListWithRedux;