import React, {ChangeEvent, useState, KeyboardEvent} from "react";
import {FilterValuesType} from "./App";
import {Button} from "./components/Button/Button";
import styles from "./Todolist.module.css"
import {CheckBox} from "./components/CheckBox/CheckBox";

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
    changeIsDone: (id: string, newIsDone: boolean) => void
}

export function Todolist(props: PropsType) {

    const [title, setTitle] = useState("")
    const [error, setError] = useState<null | string>(null)
    const [nameButton, setNameButton] = useState<FilterValuesType>("all")

    const addTaskHandler = () => {
        if (title.trim() !== "") {
            props.addTask(title.trim())
            setTitle("")

        } else setError("Title is requred")
    }

    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setTitle(event.currentTarget.value)
        setError(null)
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

    const changeIsDoneHandler = (tID: string, isDone: boolean) => {
        props.changeIsDone(tID, isDone)
    }

    const mapTasks = props.tasks.map(t => {

        return (
            <li className={t.isDone ? styles.isDone : ""} key={t.id}>
                {/*<input type="checkbox" checked={t.isDone} onChange={(event: ChangeEvent<HTMLInputElement>) => changeIsDoneHandler(t.id, event.currentTarget.checked)}/>*/}
                <CheckBox checked={t.isDone} callBack={(isDone) => changeIsDoneHandler(t.id, isDone)}/>
                <span>{t.title}</span>
                <button onClick={() => removeTaskHandler(t.id)}>x</button>
            </li>
        )
    })

    return <div>
        <h3>{props.title}</h3>
        <div>
            <input className={error ? styles.error : ""} value={title} onChange={onChangeHandler}
                   onKeyDown={onKeyPressHandler}/>
            <button onClick={addTaskHandler}>+</button>
            {error && <div className={styles.errorMessage}>Title is requred</div>}
        </div>
        <ul>
            {mapTasks}
        </ul>
        <div>
            {/*<Button name={'All'} callBack={() => changeFilterStatus("all")}/>*/}
            {/*<Button name={'Active'} callBack={() => changeFilterStatus("active")}/>*/}
            {/*<Button name={'Completed'} callBack={() => changeFilterStatus("completed")}/>*/}
            <button className={nameButton === "all" ? styles.activeFilter : ""} onClick={() => {
                changeFilterStatus("all")
                setNameButton("all")
            }}>All
            </button>
            <button className={nameButton === "active" ? styles.activeFilter : ""} onClick={() => {
                changeFilterStatus("active")
                setNameButton("active")
            }}>Active
            </button>
            <button className={nameButton === "completed" ? styles.activeFilter : ""} onClick={() => {
                changeFilterStatus("completed")
                setNameButton("completed")
            }}>Completed
            </button>
        </div>
    </div>
}

// страница 40, useStare -> useRef 20 строка
// страница 36 propsChildren
