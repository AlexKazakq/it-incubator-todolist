import React, {ChangeEvent, useState, KeyboardEvent} from "react";
import {FilterValuesType} from "./App";
import {Button} from "./components/Button/Button";

type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string) => void
    changeFilter: (value: FilterValuesType) => void
    addTask: (newTitle: string) => void
}

export function Todolist(props: PropsType) {

    const [title, setTitle] = useState("")

    const addTaskHandler = () => {
        props.addTask(title)
        setTitle("")
    }

    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setTitle(event.currentTarget.value)
    }

    const onKeyPressHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
            addTaskHandler();
        }
    }

    const changeFilterStatus = (filterValue: FilterValuesType) => {
        props.changeFilter(filterValue)
    }

    const removeTaskHandler = (tID: string) => {
        props.removeTask(tID)
    }

    const mapTasks = props.tasks.map(t => {
        return (
            <li key={t.id}>
                <input type="checkbox" checked={t.isDone}/>
                <span>{t.title}</span>
                <button onClick={() => removeTaskHandler(t.id)}>x</button>
            </li>
        )
    })

    return <div>
        <h3>{props.title}</h3>
        <div>
            <input value={title} onChange={onChangeHandler} onKeyDown={onKeyPressHandler}/>
            <button onClick={addTaskHandler}>+</button>
        </div>
        <ul>
            {mapTasks}
        </ul>
        <div>
            <Button name={'All'} callBack={() => changeFilterStatus("all")}/>
            <Button name={'Active'} callBack={() => changeFilterStatus("active")}/>
            <Button name={'Completed'} callBack={() => changeFilterStatus("completed")}/>
            {/*<button onClick={() => changeFilterStatus("all")}>All</button>*/}
            {/*<button onClick={() => changeFilterStatus("active")}>Active</button>*/}
            {/*<button onClick={() => changeFilterStatus("completed")}>Completed</button>*/}
        </div>
    </div>
}

// страница 40, useStare -> useRef 20 строка
// страница 36 propsChildren
