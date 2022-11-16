import {FilterValuesType, TodoListType} from "../App";
import {v1} from "uuid";


export type TodolistActionType = RemoveTodolistAT | AddTodolistAT | ChangeTodoListFilterAT | changeTodoListTitleAT

export type RemoveTodolistAT = {
    type: 'REMOVE-TODOLIST'
    todoListId: string
}
export type AddTodolistAT = {
    type: 'ADD-TODOLIST'
    title: string
    todoListId: string
}
type ChangeTodoListFilterAT = {
    type: 'CHANGE-TODOLIST-FILTER'
    filter: FilterValuesType
    todoListId: string
}
type changeTodoListTitleAT = {
    type: 'CHANGE-TODOLIST-TITLE'
    title: string
    todoListId: string
}

const initialState: TodoListType[] = []

export const todolistsReducer = (state = initialState, action: TodolistActionType): TodoListType[] => {
    switch (action.type) {
        case "REMOVE-TODOLIST":
            return state.filter(tl => tl.id !== action.todoListId)
        case 'ADD-TODOLIST':
            const newTodoList: TodoListType = {
                id: action.todoListId,
                title: action.title,
                filter: "all"
            }
            return [newTodoList, ...state]
        case "CHANGE-TODOLIST-FILTER":
            const todolist = state.find(tl => tl.id === action.todoListId);
            return state.map(tl => tl.id === action.todoListId ? {...tl, filter: action.filter} : tl)
        case "CHANGE-TODOLIST-TITLE":
            return state.map(tl => tl.id === action.todoListId ? {...tl, title: action.title} : tl)
        default:
            return state
    }
}

export const removeTodoListAC = (todoListId: string): RemoveTodolistAT => ({
    type: "REMOVE-TODOLIST",
    todoListId
})
export const addTodolistAC = (title: string):AddTodolistAT => ({
    type: "ADD-TODOLIST",
    title,
    todoListId: v1()
})

export const changeTodoListFilterAC = (filter: FilterValuesType, todoListId: string):ChangeTodoListFilterAT => ({
    type: "CHANGE-TODOLIST-FILTER",
    filter,
    todoListId
})
export const changeTodoListTitleAC = (title: string, todoListId: string):changeTodoListTitleAT => ({
    type: "CHANGE-TODOLIST-TITLE",
    title,
    todoListId
})