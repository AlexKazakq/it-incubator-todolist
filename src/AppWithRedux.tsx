import React, { useCallback} from "react";
import "./App.css";
import {TaskType, TodoList} from "./TodoList";
import {AddItemForm} from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@mui/material";
import {Menu} from "@mui/icons-material";
import {
    addTodolistAC,
    changeTodoListFilterAC,
    changeTodoListTitleAC,
    removeTodoListAC
} from "./store/todolist-reducer";
import {
    addTaskAC,
    changeTaskStatusAC,
    changeTaskTitleAC,
    removeTaskAC
} from "./store/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./store/store";
import {Dispatch} from "redux";

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

    const removeTask = useCallback((taskId: string, todoListId: string) => {
        dispatch(removeTaskAC(taskId, todoListId))
    }, [dispatch])
    const addTask = useCallback((title: string, todoListId: string) => {
        dispatch(addTaskAC(title, todoListId))
    }, [dispatch])
    const changeTaskStatus = useCallback((taskId: string, newTaskStatus: boolean, todoListId: string) => {
        dispatch(changeTaskStatusAC(taskId, newTaskStatus, todoListId))
    }, [dispatch])

    const changeTaskTitle = useCallback((taskId: string, title: string, todoListId: string) => {
        dispatch(changeTaskTitleAC(taskId, title, todoListId))
    }, [dispatch])

    const changeTodoListFilter = useCallback((filter: FilterValuesType, todoListId: string) => {
        dispatch(changeTodoListFilterAC(filter, todoListId))

    }, [dispatch])
    const changeTodoListTitle = useCallback((title: string, todoListId: string) => {
        dispatch(changeTodoListTitleAC(title, todoListId))
    }, [dispatch])
    const removeTodoList = useCallback((todoListId: string) => {
        dispatch(removeTodoListAC(todoListId))
    }, [dispatch])
    const addTodoList = useCallback((title: string)  => {
        dispatch(addTodolistAC(title))
    }, [dispatch])

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
                        tasks={tasks[tl.id]}

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

export default AppWithRedux;
