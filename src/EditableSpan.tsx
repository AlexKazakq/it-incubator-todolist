import React, {ChangeEvent, useState, KeyboardEvent, memo} from "react";
import {TextField} from "@mui/material";

type EditableSpanPropsType = {
    title: string
    changeTitle: (newTitle: string) => void
}


export const EditableSpan = memo((props: EditableSpanPropsType) => {
    const [isEditMode, setIsEditMode] = useState<boolean>(false)
    const [title, setTitle] = useState<string>(props.title)

    const onEditMode = () => {
        setIsEditMode(true)
    }
    const offEditMode = () => {
        setIsEditMode(false)
        props.changeTitle(title)
    }

    const onChangeSetLocalTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const onKeyHandler = (e:KeyboardEvent<HTMLDivElement>) => {
        if (e.key === 'Enter') {
            offEditMode()
        }
    }

    return (
        isEditMode
            ?

            <TextField
                value={title}
                autoFocus onBlur={offEditMode}
                onChange={onChangeSetLocalTitle}
                variant={'standard'}
                onKeyDown={onKeyHandler}
            />
            : <span onDoubleClick={onEditMode}>{props.title}</span>
    );
});

