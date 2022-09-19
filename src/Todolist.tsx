import React from "react";
import {FilterButtonType} from "./App";

type TodolistProps = {
    title: string,
    tasks: Array<TasksType>
    removeTask: (taskID: number) => void
    changeFilter: (filterValue: FilterButtonType) => void
};

export type TasksType = {
    id: number,
    title: string,
    isDone: boolean
};

export const Todolist = (props: TodolistProps) => {

    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input/>
                <button>+</button>
            </div>
            <ul>
                {props.tasks.map((el) => {
                    return (<li key={el.id}>
                        <button onClick={() => {
                            props.removeTask(el.id)
                        }}>X
                        </button>
                        <input type="checkbox" checked={el.isDone}/>
                        <span>{el.title}</span>
                    </li>)
                })}
            </ul>
            <div>
                <button onClick={() => {
                    props.changeFilter("All")
                }}>All
                </button>
                <button onClick={() => {
                    props.changeFilter("Active")
                }}>Active
                </button>
                <button onClick={() => {
                    props.changeFilter("Completed")
                }}>Completed
                </button>
            </div>
        </div>
    )
}