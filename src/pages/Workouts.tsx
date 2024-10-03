import { useState } from "react";
import { useAppDispatch } from "../hooks";
import { createWorkout, updateWorkout } from "../reducers/workoutReducer";
import { Days, NewWorkout, Workout } from "../types";
import WorkoutForm from "../components/WorkoutForm";
import { Button, Divider, Modal } from "@mui/material";
import { Link } from "react-router-dom";
import EditIcon from '@mui/icons-material/Edit';

interface WorkoutsProps {
    workouts: Workout[];
}

const Workouts = ({ workouts }: WorkoutsProps) => {
    const [formOpen, setFormOpen] = useState<boolean>(false);
    const [isEditMode, setIsEditMode] = useState<boolean>(false);
    const [workoutToEdit, setWorkoutToEdit] = useState<Workout | null>(null);

    const dispatch = useAppDispatch();

    const openForm = () => {
        setIsEditMode(false);
        setWorkoutToEdit(null);
        setFormOpen(true);
    }

    const closeForm = () => setFormOpen(false);

    const submitWorkout = (values: NewWorkout) => {
        if (isEditMode && workoutToEdit) {
            dispatch(updateWorkout({ ...workoutToEdit, ...values }));
        }
        else {
            dispatch(createWorkout(values));
        }
        closeForm();
    };

    const editWorkout = (workout: Workout) => {
        setWorkoutToEdit(workout);
        setIsEditMode(true);
        setFormOpen(true);
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
                                    <div key={workout.id} className="flex gap-2">
                                        <Button variant="outlined" className="w-full text-center p-1">
                                            <Link to={`/workouts/${workout.id}`}>
                                                {workout.title}
                                            </Link>
                                        </Button>
                                        <Button variant="outlined" className="w-10" onClick={() => editWorkout(workout)}>
                                            <EditIcon />
                                        </Button>
                                    </div>
                                )
                            }
                        })}
                        <Divider orientation="horizontal" sx={{ backgroundColor: 'black' }} />
                    </li>
                ))}
            </ul>
            <Button variant="outlined" className="w-fit" onClick={openForm}>+ add workouts</Button>

            <Modal
                open={formOpen}
                onClose={closeForm}
                aria-labelledby="modal-workout-form-title"
                aria-describedby="modal-workout-form-description"
            >
                <WorkoutForm
                    onSubmit={submitWorkout}
                    workoutToEdit={workoutToEdit}
                    isEditMode={isEditMode}
                />
            </Modal>
        </div>
    );
};

export default Workouts;
