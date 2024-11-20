import { useState } from "react";
import { useAppDispatch } from "../hooks";
import { createTask } from "../reducers/taskReducer";
import { Button, Modal } from "@mui/material";
import { Task, NewTask } from "../types";
import { toDate } from "../utils";
import TaskForm from "../components/TaskForm";
import { CheckBox } from "@mui/icons-material";

interface TimetableProps {
    tasks: Task[];
}

const Timetable = ({ tasks }: TimetableProps) => {
    const [formOpen, setFormOpen] = useState<boolean>(false);
    const [completed, setCompleted] = useState<boolean[]>(new Array(tasks.length).fill(false));

    const dispatch = useAppDispatch();

    const openForm = () => setFormOpen(true);
    const closeForm = () => setFormOpen(false);

    const submitTask = (values: NewTask) => {
        dispatch(createTask(values));
        closeForm();
    };

    return (
        <div className="w-full">
            <h1 className="text-center text-3xl mb-10">Timetable</h1>
            {tasks.map((task, i) => {
                const start = toDate(task.startsAt).toLocaleTimeString();
                const end = toDate(task.endsAt).toLocaleTimeString();
                return (
                    <div key={task.id} className="flex gap-x-4 items-center">
                        <span>{start.slice(0,-6)} {start.slice(-2)}</span>
                        <span>-</span>
                        <span>{end.slice(0,-6)} {end.slice(-2)}</span>
                        <span>►</span>
                        <span>{task.task}</span>
                        <CheckBox 
                            // checked={completed[i]} 
                            onChange={() => {
                                const newCompleted = completed.map((value, index) => index === i ? !value : value);
                                setCompleted(newCompleted);
                            }} 
                        />
                    </div>
                )
            })}
            <div className="mt-10">
                <Button variant="outlined" onClick={openForm}>add task</Button>
            </div>

            <Modal
                open={formOpen}
                onClose={closeForm}
                aria-labelledby="modal-task-form-title"
                aria-describedby="modal-task-form-description"
            >
                <TaskForm onSubmit={submitTask} />
            </Modal>
        </div>
    );
};

export default Timetable;
