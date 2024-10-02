import { useState } from "react";
import { Days, NewWorkout, Workout } from "../types";
import { Button, Divider, Modal } from "@mui/material";
import { Link } from "react-router-dom";
import WorkoutForm from "../components/WorkoutForm";
import { createWorkout } from "../reducers/workoutReducer";

interface WorkoutsProps {
    workouts: Workout[];
}

const Workouts = ({ workouts }: WorkoutsProps) => {
    const [formOpen, setFormOpen] = useState<boolean>(false);

    const openForm = () => setFormOpen(true);
    const closeForm = () => setFormOpen(false);

    const submitWorkout = (values: NewWorkout) => {
        console.log(values);
        createWorkout(values);
        closeForm();
    };

    return (
        <div className="w-full px-8 py-4">
            <ul>
                {Object.values(Days).map(day => (
                    <li key={day} className="flex flex-col gap-2 pb-4">
                        <h1 className="text-2xl">{day}</h1> 
                        {workouts.map(workout => {
                            if (workout.day === day) {
                                return (
                                    <Link 
                                        key={workout.id} 
                                        to={`/workouts/${workout.id}`}
                                        className="flex justify-center items-center p-1 border border-[#918a8a] rounded-s hover:border-[#dbd0d0] transition-colors duration-300 ease-out"
                                    >{workout.title}</Link>
                                )
                            }
                        })}
                        <Button variant="outlined" className="w-fit" onClick={openForm}>+ add workouts</Button>
                        <Divider orientation="horizontal" />
                    </li>
                ))}
            </ul>

            <Modal
                open={formOpen}
                onClose={closeForm}
                aria-labelledby="modal-workout-form-title"
                aria-describedby="modal-workout-form-description"
            >
                <WorkoutForm onSubmit={submitWorkout} />
            </Modal>
        </div>
    );
};

export default Workouts;
