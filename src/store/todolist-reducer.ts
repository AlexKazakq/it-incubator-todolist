import {FilterValuesType, TodoListType} from "../App";
import {v1} from "uuid";


type ActionType = RemoveTodolistAT | AddTodolistAT | ChangeTodoListFilterAT | changeTodoListTitleAT

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

export const todolistsReducer = (todoLists: TodoListType[], action: ActionType): TodoListType[] => {
    switch (action.type) {
        case "REMOVE-TODOLIST":
            return todoLists.filter(tl => tl.id !== action.todoListId)
        case 'ADD-TODOLIST':
            const newTodoList: TodoListType = {
                id: action.todoListId,
                title: action.title,
                filter: "all"
            }
            return [newTodoList, ...todoLists]
        case "CHANGE-TODOLIST-FILTER":
            return todoLists.map(tl => tl.id === action.todoListId ? {...tl, filter: action.filter} : tl)
        case "CHANGE-TODOLIST-TITLE":
            return todoLists.map(tl => tl.id === action.todoListId ? {...tl, title: action.title} : tl)
        default:
            return todoLists
    }
}

export const RemoveTodoListAC = (todoListId: string): RemoveTodolistAT => ({
    type: "REMOVE-TODOLIST",
    todoListId
})
export const AddTodolistAC = (title: string):AddTodolistAT => ({
    type: "ADD-TODOLIST",
    title,
    todoListId: v1()
})

export const ChangeTodoListFilterAC = (filter: FilterValuesType, todoListId: string):ChangeTodoListFilterAT => ({
    type: "CHANGE-TODOLIST-FILTER",
    filter,
    todoListId
})
export const changeTodoListTitleAC = (title: string, todoListId: string):changeTodoListTitleAT => ({
    type: "CHANGE-TODOLIST-TITLE",
    title,
    todoListId
})