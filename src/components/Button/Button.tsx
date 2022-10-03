import React from "react";
import styles from './../../Todolist.module.css'

type PropsType = {
    name: string,
    callBack: () => void
}


export const Button = (props: PropsType) => {
    const onClickHandler = () => {
        props.callBack();
    }
    return (
        <button className={styles.activeFilter} onClick={onClickHandler}>{props.name}</button>
    )
}