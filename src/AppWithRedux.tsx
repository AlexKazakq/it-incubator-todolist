import React, {Reducer, useReducer} from "react";
import "./App.css";
import TodoList, {TaskType} from "./TodoList";
import {v1} from "uuid";
import {AddItemForm} from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@mui/material";
import {Menu} from "@mui/icons-material";
import {
    addTodolistAC,
    changeTodoListFilterAC,
    changeTodoListTitleAC,
    removeTodoListAC, TodolistActionType,
    todolistsReducer
} from "./store/todolist-reducer";
import {
    addTaskAC,
    changeTaskStatusAC,
    changeTaskTitleAC,
    removeTaskAC,
    TasksActionType,
    tasksReducer
} from "./store/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./store/store";
import {Dispatch} from "redux";
import TodoListWithRedux from "./store/TodoListWithRedux";

//data -> CRUD
//create +
//read (+,+,+)// filter => //sort, pagination
//update +
//delete +

//CLI
//GUI-!!!!!!
//VUI

export type FilterValuesType = "all" | "active" | "completed"

export type TodoListType = {
    id: string
    title: string
    filter: FilterValuesType
}

export type TasksStateType = {
    [todoListId: string]: TaskType[]
}

function AppWithRedux() {
    // BLL:
    const todoLists = useSelector<AppRootStateType, TodoListType[]>(state => state.todolists)
    const tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks)

    const dispatch = useDispatch<Dispatch>()

    const removeTask = (taskId: string, todoListId: string) => {
        dispatch(removeTaskAC(taskId, todoListId))
    }
    const addTask = (title: string, todoListId: string) => {
        dispatch(addTaskAC(title, todoListId))
    }
    const changeTaskStatus = (taskId: string, newTaskStatus: boolean, todoListId: string) => {
        dispatch(changeTaskStatusAC(taskId, newTaskStatus, todoListId))
    }

    const changeTaskTitle = (taskId: string, title: string, todoListId: string) => {
        dispatch(changeTaskTitleAC(taskId, title, todoListId))
    }

    const changeTodoListFilter = (filter: FilterValuesType, todoListId: string) => {
        dispatch(changeTodoListFilterAC(filter, todoListId))

    }
    const changeTodoListTitle = (title: string, todoListId: string) => {
        dispatch(changeTodoListTitleAC(title, todoListId))
    }
    const removeTodoList = (todoListId: string) => {
        dispatch(removeTodoListAC(todoListId))
    }
    const addTodoList = (title: string) => {
        dispatch(addTodolistAC(title))
    }

    //GUI:
    const getFilteredTasks = (t: Array<TaskType>, f: FilterValuesType) => {
        let tasksForTodoList = t;
        if (f === "active") {
            tasksForTodoList = t.filter(t => !t.isDone)
        }
        if (f === "completed") {
            tasksForTodoList = t.filter(t => t.isDone)
        }
        return tasksForTodoList
    }

    const todoListComponents = todoLists.map(tl => {
        return (
            <Grid item key={tl.id}>
                <Paper style={{width: "300px", padding: "20px"}}
                       elevation={8}
                >
                    <TodoListWithRedux todolist={tl}/>
                </Paper>
            </Grid>
        )
    })


    return (
        <div className="App">
            <AppBar position="static">
                <Toolbar style={{justifyContent: "space-between"}}>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6">
                        Todolists
                    </Typography>
                    <Button color="inherit" variant={"outlined"}>Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container style={{padding: "20px 0"}}>
                    <AddItemForm addItem={addTodoList}/>
                </Grid>
                <Grid container spacing={5}>
                    {todoListComponents}
                </Grid>
            </Container>
        </div>
    );
}

export default AppWithRedux;
