import { useState } from "react";
import { useAppDispatch } from "../hooks";
import { createTask } from "../reducers/taskReducer";
import { Button, Modal } from "@mui/material";
import { Task, NewTask } from "../types";
import TaskForm from "../components/TaskForm";

interface TimetableProps {
    tasks: Task[];
}

const Timetable = ({ tasks }: TimetableProps) => {
    const [formOpen, setFormOpen] = useState<boolean>(false);

    const dispatch = useAppDispatch();

    const openForm = () => setFormOpen(true);
    const closeForm = () => setFormOpen(false);

    const submitTask = (values: NewTask) => {
        console.log('Task values:', values);
        dispatch(createTask(values));
    };

    return (
        <div className="w-full">
            <h1 className="text-center text-3xl mb-10">Timetable</h1>
            {tasks.map(task => {
                console.log(task);
                return (
                    <div key={task.id}>
                        <p>{task.task}</p>
                    </div>
                )
            })}
            <div>
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
