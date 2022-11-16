import {TasksStateType, TodoListType} from "../App";
import {TaskType} from "../TodoList";
import {v1} from "uuid";
import {AddTodolistAT, RemoveTodolistAT} from "./todolist-reducer";


export type TasksActionType = RemoveTaskAT | AddTaskAT | changeTaskStatusAT | changeTaskTitleAT | AddTodolistAT | RemoveTodolistAT

type RemoveTaskAT = ReturnType<typeof removeTaskAC>

type AddTaskAT = ReturnType<typeof addTaskAC>

type changeTaskStatusAT = ReturnType<typeof changeTaskStatusAC>

type changeTaskTitleAT = ReturnType<typeof changeTaskTitleAC>

const initialState: TasksStateType = {}


export const tasksReducer = (state = initialState, action: TasksActionType): TasksStateType => {
    switch (action.type) {
        case "REMOVE_TASK":
            return {...state, [action.todolistId]: state[action.todolistId].filter(t => t.id !== action.taskId)}
        case "ADD_TASK":
            const newTask: TaskType = {
                id: v1(),
                title: action.title,
                isDone: false
            }
            return {...state, [action.todolistId]: [newTask, ...state[action.todolistId]]}
        case "CHANGE_TASK_STATUS":
            return {...state,
                [action.todolistId]: state[action.todolistId].map(t => t.id === action.taskId ? {
                    ...t,
                    isDone: action.isDone
                } : t)
            }
        case "CHANGE_TASK_TITLE":
            return {...state, [action.todolistId]: state[action.todolistId].map(t => t.id === action.taskId ? {...t, title: action.title} : t)}
        case 'ADD-TODOLIST':
            return {
                ...state,
                [action.todoListId]:[]
            }
        case 'REMOVE-TODOLIST':
            // const {[action.todoListId]:[], ...rest} = {...state}
            let stateCopy = {...state}
            delete stateCopy[action.todoListId]
            return stateCopy
        default:
            return state
    }
}

export const removeTaskAC = (taskId: string, todolistId: string) => {
    return {type: "REMOVE_TASK", taskId, todolistId} as const
}
export const addTaskAC = (title: string, todolistId: string) => {
    return {type: "ADD_TASK", title, todolistId} as const
}
export const changeTaskStatusAC = (taskId: string, isDone: boolean, todolistId: string) => {
    return {type: "CHANGE_TASK_STATUS", taskId, isDone, todolistId} as const
}
export const changeTaskTitleAC = (taskId: string, title: string, todolistId: string) => {
    return {type: "CHANGE_TASK_TITLE", taskId, title, todolistId} as const
}

