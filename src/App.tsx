import React, {useState} from "react";
import "./App.css";
import {TasksType, Todolist} from "./Todolist";

export type FilterButtonType = 'All' | 'Active' | 'Completed'

function App() {
    let title1 = "What to learn";

    const [tasks1, setTasks1] = useState(
        [
            {id: 1, title: "HTML&CSS", isDone: true},
            {id: 2, title: "JS", isDone: true},
            {id: 3, title: "ReactJS", isDone: false}
        ])

    const [filteredValue, setFilteredValue] = useState<TasksType[]>(tasks1)

    const changeFilter = (filterValue: FilterButtonType) => {
        if (filterValue === 'Completed') {
            setFilteredValue(tasks1.filter(el => el.isDone))
        }
        if (filterValue === 'Active') {
            setFilteredValue(tasks1.filter(el => !el.isDone))
        }
        if (filterValue === 'All') {
            setFilteredValue(tasks1)
        }
    }
    const removeTask = (taskID: number) => {
        setFilteredValue(filteredValue.filter(el => el.id !== taskID));
    }

    return (
        <div className="App">
            <Todolist
                title={title1}
                tasks={filteredValue}
                removeTask={removeTask}
                changeFilter={changeFilter}/>
        </div>
    );
}

export default App;
