import React, {ChangeEvent, KeyboardEvent, memo, useState} from "react";
import {IconButton, TextField} from "@mui/material";
import {AddToPhotosTwoTone} from "@mui/icons-material";


type AddItemFormPropsType = {
    addItem: (title: string) => void
}

export const AddItemForm = memo((props: AddItemFormPropsType) => {
    const [title, setTitle] = useState<string>("")
    const [error, setError] = useState<boolean>(false)

    const onChangeSetLocalTitle = (e: ChangeEvent<HTMLInputElement>) => {
        error && setError(false)
        setTitle(e.currentTarget.value)
    }
    const onEnterDownAddItem = (e: KeyboardEvent<HTMLInputElement>) => e.key === "Enter" && addTodolist()

    const errorMessage = error
        ? <div style={{fontWeight: "bold", color: "hotpink"}}>Title is required!</div>
        : null

    const addTodolist = () => {
        const trimmedTitle = title.trim()
        if (trimmedTitle !== "") {
            props.addItem(trimmedTitle)
        } else {
            setError(true)
        }
        setTitle("")
    }

    return (
        <div>
            <TextField
                variant={"outlined"}
                value={title}
                onChange={onChangeSetLocalTitle}
                onKeyDown={onEnterDownAddItem}
                label={"Title"}
                size={'small'}
                error={error}
                helperText={error && 'Title is required!'}
            />

            <IconButton onClick={addTodolist} color={"primary"} size={"small"}>
                <AddToPhotosTwoTone/>
            </IconButton>
            {/*{errorMessage}*/}
        </div>
    );
});
