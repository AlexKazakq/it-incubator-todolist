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

function AppWithReducer() {
    // BLL:

    const todoListId_1 = v1()
    const todoListId_2 = v1()
    const [todoLists, dispatchToTodoLists] = useReducer<Reducer<TodoListType[], TodolistActionType>>(todolistsReducer,[
        {id: todoListId_1, title: "What to learn", filter: "all"},
        {id: todoListId_2, title: "What to buy", filter: "all"},
    ])
    const [tasks, dispatchToTasks] = useReducer<Reducer<TasksStateType, TasksActionType>>(tasksReducer, {
        [todoListId_1]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS/TS", isDone: true},
            {id: v1(), title: "React", isDone: false},
            {id: v1(), title: "Redux", isDone: false},
            {id: v1(), title: "RTK", isDone: false},
        ],
        [todoListId_2]: [
            {id: v1(), title: "Water", isDone: true},
            {id: v1(), title: "Beer", isDone: true},
            {id: v1(), title: "Toilet paper", isDone: false},
            {id: v1(), title: "Buckwheat", isDone: false},
            {id: v1(), title: "Meet", isDone: false},
        ]
    })

    const removeTask = (taskId: string, todoListId: string) => {
        dispatchToTasks(removeTaskAC(taskId, todoListId))
    }
    const addTask = (title: string, todoListId: string) => {
        dispatchToTasks(addTaskAC(title, todoListId))
    }
    const changeTaskStatus = (taskId: string, newTaskStatus: boolean, todoListId: string) => {
        dispatchToTasks(changeTaskStatusAC(taskId, newTaskStatus, todoListId))
    }

    const changeTaskTitle = (taskId: string, title: string, todoListId: string) => {
        dispatchToTasks(changeTaskTitleAC(taskId, title, todoListId))
    }

    const changeTodoListFilter = (filter: FilterValuesType, todoListId: string) => {
        dispatchToTodoLists(changeTodoListFilterAC(filter, todoListId))

    }
    const changeTodoListTitle = (title: string, todoListId: string) => {
        dispatchToTodoLists(changeTodoListTitleAC(title, todoListId))
    }
    const removeTodoList = (todoListId: string) => {
        let action = removeTodoListAC(todoListId)
        dispatchToTodoLists(action)
        dispatchToTasks(action)
    }
    const addTodoList = (title: string) => {
        let action = addTodolistAC(title)
        dispatchToTodoLists(action)
        dispatchToTasks(action)
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
                    <TodoList
                        title={tl.title}
                        filter={tl.filter}
                        todoListId={tl.id}
                        tasks={getFilteredTasks(tasks[tl.id], tl.filter)}

                        addTask={addTask}
                        removeTask={removeTask}
                        removeTodoList={removeTodoList}
                        changeTaskTitle={changeTaskTitle}
                        changeTaskStatus={changeTaskStatus}
                        changeTodoListTitle={changeTodoListTitle}
                        changeTodoListFilter={changeTodoListFilter}
                    />
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

export default AppWithReducer;
